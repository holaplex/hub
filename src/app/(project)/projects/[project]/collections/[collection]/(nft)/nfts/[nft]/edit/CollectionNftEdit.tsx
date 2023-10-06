'use client';

import {
  GetCollectionMint,
  GetCollectionMintUpdates,
} from './../../../../../../../../../../queries/mint.graphql';
import { UpdateCollectionMint } from './../../../../../../../../../../mutations/mint.graphql';
import { useEffect } from 'react';
import {
  Maybe,
  CollectionMint,
  UpdateMintInput,
  Blockchain,
  CreatorInput,
  AssetType,
} from '../../../../../../../../../../graphql.types';
import Card from '../../../../../../../../../../components/Card';
import {
  Attribute,
  RoyaltiesShortcut,
  RoyaltiesDestination,
} from '../../../../../../../../../../providers/DropFormProvider';
import { uploadFile } from '../../../../../../../../../../modules/upload';
import { useRouter } from 'next/navigation';
import { useMutation, useQuery, ApolloError } from '@apollo/client';
import { Form, Placement, Button } from '@holaplex/ui-library-react';
import Typography, { Size } from '../../../../../../../../../../components/Typography';
import Dropzone from 'react-dropzone';
import clsx from 'clsx';
import { when, isEmpty, always, ifElse, isNil } from 'ramda';
import { Icon } from '../../../../../../../../../../components/Icon';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { useProject } from '../../../../../../../../../../hooks/useProject';
import { toast } from 'react-toastify';
import Link from 'next/link';

interface GetCollectionNftVars {
  mint: string;
}

interface GetCollectionNftData {
  mint: Maybe<CollectionMint>;
}

interface CollectionNftEditProps {
  mint: string;
  project: string;
  collection: string;
}

interface UpdateCollectionNftForm {
  name: string;
  symbol: string;
  description: string;
  image: File | string;
  animationUrl?: string;
  includeAnimationUrl?: boolean;
  attributes: Attribute[];
  externalUrl: string;
  royaltiesDestination: RoyaltiesDestination;
  creators: CreatorInput[];
  royaltiesShortcut: RoyaltiesShortcut;
  royalties?: string;
}

interface UpdateCollectionNftVars {
  input: UpdateMintInput;
}

interface UpdateCollectionNftData {
  collectionMint: CollectionMint;
}

export default function CollectionNftEdit({
  mint,
  project,
  collection,
}: CollectionNftEditProps): JSX.Element {
  const router = useRouter();
  const projectContext = useProject();
  const collectionMintQuery = useQuery<GetCollectionNftData, GetCollectionNftVars>(
    GetCollectionMint,
    { variables: { mint } }
  );
  const [edit, { loading }] = useMutation<UpdateCollectionNftData, UpdateCollectionNftVars>(
    UpdateCollectionMint
  );

  const onSubmit = async ({
    creators,
    symbol,
    name,
    description,
    animationUrl,
    image,
    externalUrl,
    attributes,
    royaltiesDestination,
    royaltiesShortcut,
    royalties,
  }: UpdateCollectionNftForm) => {
    let imageUrl = image;

    if (image instanceof File) {
      const { uri } = await uploadFile(image);
      imageUrl = uri;
    }

    if (royaltiesDestination === RoyaltiesDestination.ProjectTreasury) {
      creators = [{ address: wallet?.address as string, share: 100 }];
    }

    if (royaltiesShortcut !== RoyaltiesShortcut.Custom) {
      royalties = royaltiesShortcut as string;
    }

    creators = creators.map(({ address, share = 100 }) => {
      const creator: CreatorInput = {
        address,
        share: typeof share === 'string' ? parseInt(share) : share,
      };

      if (address === wallet?.address) {
        creator.verified = true;
      }

      return creator;
    });

    try {
      await edit({
        variables: {
          input: {
            id: mint,
            creators,
            sellerFeeBasisPoints: ifElse(
              isNil,
              always(null),
              (royalties) => parseFloat(royalties.split('%')[0]) * 100
            )(royalties),
            metadataJson: {
              attributes,
              description,
              externalUrl: when(isEmpty, always(null))(externalUrl) as string | null,
              name,
              image: imageUrl as string,
              animationUrl: when(isEmpty, always(null))(animationUrl) as string | null,
              symbol,
            },
          },
        },
        onError: (error: ApolloError) => {
          toast.error(error.message);
        },
        refetchQueries: [
          {
            query: GetCollectionMint,
            variables: { mint },
          },
          {
            query: GetCollectionMintUpdates,
            variables: { mint },
          },
        ],
      });

      toast.success('NFT is updating. See the update history for status.');
    } catch {
    } finally {
      router.push(`/projects/${project}/collections/${collection}/nfts/${mint}/updates`);
    }
  };
  const {
    handleSubmit,
    formState,
    reset,
    register,
    setError,
    setValue,
    clearErrors,
    watch,
    control,
  } = useForm<UpdateCollectionNftForm>();
  const includeAnimationUrl = watch('includeAnimationUrl');
  const royaltiesDestination = watch('royaltiesDestination');
  const royaltiesShortcut = watch('royaltiesShortcut');
  const creators = watch('creators');
  const attributesArrayField = useFieldArray({
    control,
    name: 'attributes',
  });
  const collectionMintData = collectionMintQuery.data?.mint;
  const blockchain = collectionMintData?.collection?.blockchain;
  const wallet = projectContext.project?.treasury?.wallets?.find((wallet) => {
    switch (collectionMintData?.collection?.blockchain) {
      case Blockchain.Solana:
        return wallet.assetId === AssetType.Sol;
      case Blockchain.Polygon:
        return wallet.assetId === AssetType.Matic;
      case Blockchain.Ethereum:
        return wallet.assetId === AssetType.Eth;
    }
  });
  const creatorsFieldArray = useFieldArray({
    control,
    name: 'creators',
    rules: {
      required: true,
      validate: (creators) => {
        switch (blockchain) {
          case Blockchain.Solana:
            if (creators.length > 5) {
              return 'Can only set up to 5 creators.';
            }
            break;
          case Blockchain.Polygon || Blockchain.Ethereum:
            if (creators.length > 1) {
              return 'Can only set 1 creator.';
            }
            break;
        }

        const total = creators.reduce(
          (acc: number, creator: CreatorInput) =>
            acc + parseInt(creator.share as unknown as string),
          0
        );

        return total === 100 || 'Creator shares must sum to 100.';
      },
    },
  });

  useEffect(() => {
    if (!collectionMintData) {
      return;
    }
    const metadataJson = collectionMintData?.metadataJson;
    const creators = collectionMintData.creators || [];
    const attributes = metadataJson?.attributes || [];
    const royalties = collectionMintData.royalties;
    const royaltiesDestination =
      wallet?.address === creators[0]?.address && creators[0]?.share === 100
        ? RoyaltiesDestination.ProjectTreasury
        : RoyaltiesDestination.Creators;

    let royaltiesShortcut = RoyaltiesShortcut.Custom;

    switch (royalties) {
      case RoyaltiesShortcut.Zero:
        royaltiesShortcut = RoyaltiesShortcut.Zero;
        break;
      case RoyaltiesShortcut.TwoPointFive:
        royaltiesShortcut = RoyaltiesShortcut.TwoPointFive;
        break;
      case RoyaltiesShortcut.Five:
        royaltiesShortcut = RoyaltiesShortcut.Five;
        break;
      case RoyaltiesShortcut.Ten:
        royaltiesShortcut = RoyaltiesShortcut.Ten;
        break;
    }

    reset({
      name: metadataJson?.name,
      symbol: metadataJson?.symbol,
      description: metadataJson?.description,
      image: metadataJson?.image,
      animationUrl: metadataJson?.animationUrl as string | undefined,
      includeAnimationUrl: metadataJson?.animationUrl ? true : false,
      attributes: attributes.map(({ traitType, value }) => ({ traitType, value })),
      externalUrl: metadataJson?.externalUrl as string | undefined,
      royaltiesDestination,
      creators,
      royaltiesShortcut,
      royalties,
    });
  }, [reset, collectionMintData]);

  return (
    <div className="flex flex-col px-6 py-6">
      {collectionMintQuery.loading ? (
        <>
          <div className="h-10 w-64 bg-stone-900 animate-pulse rounded-lg" />
          <Card className="w-[540px] mx-auto mt-5">
            <div className="h-8 w-28 bg-stone-950 animate-pulse rounded-lg" />
            <div className="flex flex-col gap-6 mt-4">
              <div>
                <div className="w-16 h-4 rounded-md bg-stone-950 animate-pulse" />
                <div className="w-full h-28 mt-1 rounded-md bg-stone-950 animate-pulse" />
              </div>
              <div className="flex gap-6 w-full">
                <div className="basis-3/4">
                  <div className="w-16 h-4 rounded-md bg-stone-950 animate-pulse" />
                  <div className="w-full h-10 mt-1 rounded-md bg-stone-950 animate-pulse" />
                </div>
                <div className="basis-1/4">
                  <div className="w-16 h-4 rounded-md bg-stone-950 animate-pulse" />
                  <div className="w-full h-10 mt-1 rounded-md bg-stone-950 animate-pulse" />
                </div>
              </div>
              <div className="w-full">
                <div className="w-16 h-4 rounded-md bg-stone-950 animate-pulse" />
                <div className="w-full h-20 mt-1 rounded-md bg-stone-950 animate-pulse" />
              </div>
              <div className="w-full">
                <div className="w-16 h-4 rounded-md bg-stone-950 animate-pulse" />
                <div className="w-full h-10 mt-1 rounded-md bg-stone-950 animate-pulse" />
              </div>
              <div className="w-full">
                <div className="w-16 h-4 rounded-md bg-stone-950 animate-pulse" />
                <div className="flex w-full mt-1 gap-6 align-bottom">
                  <div className="basis-1/2 w-full">
                    <div className="w-12 h-4 rounded-md bg-stone-950 animate-pulse" />
                    <div className="w-full h-10  mt-1 rounded-md bg-stone-950 animate-pulse" />
                  </div>
                  <div className="basis-1/2 w-full">
                    <div className="w-12 h-4 rounded-md bg-stone-950 animate-pulse" />
                    <div className="w-full h-10 mt-1 rounded-md bg-stone-950 animate-pulse" />
                  </div>
                  <div className="w-10 h-10 rounded-md bg-stone-950 animate-pulse flex-none self-end" />
                </div>
                <div className="flex w-full mt-1 gap-6 align-bottom">
                  <div className="basis-1/2 w-full">
                    <div className="w-12 h-4 rounded-md bg-stone-950 animate-pulse" />
                    <div className="w-full h-10  mt-1 rounded-md bg-stone-950 animate-pulse" />
                  </div>
                  <div className="basis-1/2 w-full">
                    <div className="w-12 h-4 rounded-md bg-stone-950 animate-pulse" />
                    <div className="w-full h-10 mt-1 rounded-md bg-stone-950 animate-pulse" />
                  </div>
                  <div className="w-10 h-10 rounded-md bg-stone-950 animate-pulse flex-none self-end" />
                </div>
                <div className="w-28 h-10 mt-4 rounded-md bg-stone-950 animate-pulse" />
              </div>
            </div>
            <div className="h-8 w-28 bg-stone-950 animate-pulse rounded-lg my-4" />
            <div className="w-full">
              <div className="w-16 h-4 rounded-md bg-stone-950 animate-pulse" />
              <div className="w-full gap-2 flex flex-row mt-1">
                <div className="w-full h-10 rounded-md bg-stone-950 animate-pulse" />
                <div className="w-full h-10 rounded-md bg-stone-950 animate-pulse" />
                <div className="w-full h-10 rounded-md bg-stone-950 animate-pulse" />
                <div className="w-full h-10 rounded-md bg-stone-950 animate-pulse" />
                <div className="w-full h-10 rounded-md bg-stone-950 animate-pulse" />
              </div>
            </div>
            <div className="w-full mt-8">
              <div className="w-64 h-4 rounded-md bg-stone-950 animate-pulse" />
              <div className="w-full flex justify-between mt-1">
                <div className="flex gap-2">
                  <div className="w-4 h-4 rounded-full bg-stone-950 animate-pulse" />
                  <div className="w-40 h-4 rounded-md bg-stone-950 animate-pulse" />
                </div>
                <div className="flex gap-2">
                  <div className="w-4 h-4 rounded-full bg-stone-950 animate-pulse" />
                  <div className="w-40 h-4 rounded-md bg-stone-950 animate-pulse" />
                </div>
              </div>
              <div className="w-full flex justify-end gap-6 mt-4">
                <div className="w-24 h-10 rounded-md bg-stone-950 animate-pulse" />
                <div className="w-24 h-10 rounded-md bg-stone-950 animate-pulse" />
              </div>
            </div>
          </Card>
        </>
      ) : (
        <>
          <Typography.Header size={Size.H1}>
            Update &#34;{collectionMintData?.metadataJson?.name as string}&#34;
          </Typography.Header>
          <Form className="flex flex-col mt-5" onSubmit={handleSubmit(onSubmit)}>
            <Card className="w-[540px] m-auto">
              <Typography.Header size={Size.H2} className="mb-4">
                Details
              </Typography.Header>

              <Form.Label
                name={includeAnimationUrl ? 'Cover image' : 'Main artwork'}
                className="text-xs text-yellow-300"
              >
                <Controller
                  name="image"
                  control={control}
                  rules={{ required: 'Please upload an image.' }}
                  render={({ field: { value, onBlur } }) => (
                    <Dropzone
                      noClick
                      multiple={false}
                      onDrop={([file], _reject, e) => {
                        e.preventDefault();
                        clearErrors('image');
                        if (file['type'].split('/')[0] !== 'image') {
                          setError('image', {
                            message:
                              'Uploading video files is not currently supported. You can add a link to a hosted video by checking the "Include a video" checkbox below.',
                          });
                        } else {
                          setValue('image', file as unknown as File, { shouldValidate: true });
                        }
                      }}
                    >
                      {({ getRootProps, getInputProps, isDragActive, open }) => {
                        return (
                          <div
                            {...getRootProps()}
                            className={clsx(
                              'flex items-center justify-center border border-dashed border-stone-800 cursor-pointer rounded-md p-6 text-center text-gray-500',
                              {
                                'bg-stone-800': isDragActive,
                              }
                            )}
                          >
                            <input {...getInputProps({ onBlur })} />
                            {value ? (
                              <Form.DragDrop.Preview value={value} />
                            ) : (
                              <div className="flex flex-col gap-2 text-gray-400">
                                <p className="text-center">
                                  Drag & drop file or{' '}
                                  <span className="text-yellow-300 cursor-pointer">
                                    Browse files
                                  </span>{' '}
                                  to upload.
                                  <br />
                                  <br />
                                  JPEG, GIF and PNG supported. Must be under 250 MB.
                                </p>
                              </div>
                            )}
                          </div>
                        );
                      }}
                    </Dropzone>
                  )}
                />
              </Form.Label>
              <Form.Error message={formState.errors.image?.message} />

              <Form.Label name="Include a video" placement={Placement.Right} className="mt-5">
                <Form.Checkbox {...register('includeAnimationUrl')} />
              </Form.Label>

              <>
                {includeAnimationUrl && (
                  <Form.Label name="Video URL" className="text-xs mt-5 basis-3/4">
                    <Form.Input
                      {...register('animationUrl')}
                      autoFocus
                      placeholder="URL to hosted video"
                    />
                  </Form.Label>
                )}
              </>

              <div className="flex items-center gap-6">
                <div className="mt-5 basis-3/4 self-baseline">
                  <Form.Label name="Name" className="text-xs">
                    <Form.Input
                      {...register('name', {
                        required: 'Please enter a name.',
                        validate: (value) => {
                          if (blockchain === Blockchain.Solana && value.length > 32) {
                            return 'Name length exceeded the limit of 32.';
                          }
                        },
                      })}
                      autoFocus
                      placeholder="e.g. Bored Ape Yatch Club"
                    />
                  </Form.Label>
                  <Form.Error message={formState.errors.name?.message} />
                </div>
                <div className="mt-5 basis-1/4 self-baseline">
                  <Form.Label name="Symbol" className="text-xs">
                    <Form.Input
                      {...register('symbol', {
                        required: 'Symbol required.',
                        validate: (value) => {
                          if (blockchain === Blockchain.Solana && value.length > 10) {
                            return 'Symbol length exceeded the limit of 10.';
                          }
                        },
                      })}
                      placeholder="e.g. BAYC"
                    />
                  </Form.Label>
                  <Form.Error message={formState.errors.symbol?.message} />
                </div>
              </div>
              <Form.Label name="Description" className="text-xs mt-5">
                <Form.TextArea
                  {...register('description')}
                  placeholder="Enter a description for the NFT."
                />
              </Form.Label>
              <Form.Label name="External URL" className="text-xs mt-5">
                <Form.Input
                  {...register('externalUrl')}
                  placeholder="Set an external url for the NFT."
                />
              </Form.Label>
              <Form.Label name="Attribute" className="text-xs mt-5">
                {attributesArrayField.fields.map((field, index) => (
                  <div className="flex gap-6" key={field.id}>
                    <Form.Label name="Trait" className="text-xs basis-1/2">
                      <Form.Input
                        {...register(`attributes.${index}.traitType`, {
                          required: true,
                          minLength: 1,
                        })}
                      />
                    </Form.Label>

                    <Form.Label name="Value" className="text-xs basis-1/2">
                      <Form.Input
                        {...register(`attributes.${index}.value`, { required: true, minLength: 1 })}
                      />
                    </Form.Label>

                    <div
                      className="rounded-md bg-stone-800 hover:bg-stone-950 p-3 self-end cursor-pointer"
                      onClick={() => attributesArrayField.remove(index)}
                    >
                      <Icon.Close stroke="stroke-white" />
                    </div>
                  </div>
                ))}
              </Form.Label>
              <Button
                className="mt-4 self-start"
                variant="secondary"
                onClick={() => attributesArrayField.append({ traitType: '', value: '' })}
              >
                Add attribute
              </Button>
              <Typography.Header size={Size.H2} className="my-4">
                Royalties
              </Typography.Header>
              <Form.Label name="Royalty percentage" className="text-xs">
                <Form.RadioGroup>
                  <Form.Label
                    name="0%"
                    htmlFor="0"
                    placement={Placement.Right}
                    peerClassName="form-radio-custombox"
                  >
                    <Form.RadioGroup.Radio
                      {...register('royaltiesShortcut')}
                      id="0"
                      value={RoyaltiesShortcut.Zero}
                      className="hidden peer"
                    />
                  </Form.Label>
                  <Form.Label
                    name="2.5%"
                    htmlFor="2.5"
                    placement={Placement.Right}
                    peerClassName="form-radio-custombox"
                  >
                    <Form.RadioGroup.Radio
                      {...register('royaltiesShortcut')}
                      id="2.5"
                      value={RoyaltiesShortcut.TwoPointFive}
                      className="hidden peer"
                    />
                  </Form.Label>
                  <Form.Label
                    name="5%"
                    htmlFor="5"
                    placement={Placement.Right}
                    peerClassName="form-radio-custombox"
                  >
                    <Form.RadioGroup.Radio
                      {...register('royaltiesShortcut')}
                      id="5"
                      value={RoyaltiesShortcut.Five}
                      className="hidden peer"
                    />
                  </Form.Label>
                  <Form.Label
                    name="10%"
                    placement={Placement.Right}
                    peerClassName="form-radio-custombox"
                  >
                    <Form.RadioGroup.Radio
                      {...register('royaltiesShortcut')}
                      id="10"
                      value={RoyaltiesShortcut.Ten}
                      className="hidden peer"
                    />
                  </Form.Label>
                  <Form.Label
                    name="Custom"
                    htmlFor="custom"
                    placement={Placement.Right}
                    peerClassName="form-radio-custombox"
                  >
                    <Form.RadioGroup.Radio
                      {...register('royaltiesShortcut')}
                      id="custom"
                      value={RoyaltiesShortcut.Custom}
                      className="hidden peer"
                    />
                  </Form.Label>
                </Form.RadioGroup>
              </Form.Label>
              <>
                {royaltiesShortcut === RoyaltiesShortcut.Custom && (
                  <>
                    <Form.Input
                      {...register('royalties', {
                        required: royaltiesShortcut === RoyaltiesShortcut.Custom,
                        validate: (royalties) => {
                          if (!royalties) {
                            return true;
                          }

                          const amount = royalties.split('%')[0];

                          return (
                            parseFloat(amount) <= 100 ||
                            'Royalty percentage must be equal to or under a 100%'
                          );
                        },
                      })}
                      className="mt-2"
                      placeholder="e.g. 12.5%"
                    />
                    <Form.Error message={formState.errors.royalties?.message} />
                  </>
                )}
                <Form.Label name="Destination for royalties received" className="mt-8 text-xs">
                  <Form.RadioGroup>
                    <Form.Label name="Use project treasury" placement={Placement.Right}>
                      <Form.RadioGroup.Radio
                        {...register('royaltiesDestination')}
                        value={RoyaltiesDestination.ProjectTreasury}
                      />
                    </Form.Label>
                    <Form.Label name="Specify wallet address" placement={Placement.Right}>
                      <Form.RadioGroup.Radio
                        {...register('royaltiesDestination')}
                        value={RoyaltiesDestination.Creators}
                      />
                    </Form.Label>
                  </Form.RadioGroup>
                </Form.Label>

                {royaltiesDestination === RoyaltiesDestination.Creators && (
                  <>
                    {creatorsFieldArray.fields.map((field, index) => (
                      <div className="flex gap-6" key={field.id}>
                        <div className="mt-5 basis-3/4 self-baseline">
                          <Form.Label name="Wallet" className="text-xs">
                            <Form.Input
                              {...register(`creators.${index}.address`, {
                                required: 'Please enter a wallet address',
                              })}
                              placeholder="Paste royalty wallet address"
                            />
                          </Form.Label>
                          <Form.Error
                            message={
                              formState.errors.creators
                                ? formState.errors.creators[index]?.address?.message
                                : ''
                            }
                          />
                        </div>

                        <Form.Label
                          name="Royalties"
                          className="text-xs mt-5 basis-1/4 self-baseline"
                        >
                          <Form.Input
                            {...register(`creators.${index}.share`)}
                            type="number"
                            placeholder="e.g. 10%"
                            disabled={blockchain === Blockchain.Polygon}
                          />
                        </Form.Label>
                        <div
                          className="rounded-md bg-stone-900 hover:bg-stone-800 p-3 self-end cursor-pointer"
                          onClick={() => creatorsFieldArray.remove(index)}
                        >
                          <Icon.Close stroke="stroke-white" />
                        </div>
                      </div>
                    ))}
                    {(blockchain === Blockchain.Solana || creators.length === 0) && (
                      <Button
                        className="mt-4 self-start"
                        variant="secondary"
                        onClick={() => creatorsFieldArray.append({ address: '', share: Number() })}
                      >
                        Add wallet
                      </Button>
                    )}
                  </>
                )}
              </>
              <div className="flex items-center justify-end gap-6 mt-4">
                <Link
                  href={`/projects/${project}/collections/${collection}/nfts/${mint}/transfers`}
                >
                  <Button variant="secondary" disabled={formState.isSubmitting}>
                    Cancel
                  </Button>
                </Link>
                <Button
                  htmlType="submit"
                  loading={formState.isSubmitting}
                  disabled={formState.isSubmitting}
                >
                  Update
                </Button>
              </div>
            </Card>
          </Form>
        </>
      )}
    </div>
  );
}
