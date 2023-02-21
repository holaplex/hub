'use client';
import { Button, Form } from '@holaplex/ui-library-react';
import { Icon } from '../../../../../../components/Icon';
import Card from '../../../../../../components/Card';
import Typography, { Size } from '../../../../../../components/Typography';

export default function EditToken() {
  return (
    <div className="h-full flex flex-col p-4">
      <div className="text-2xl font-medium text-gray-500">
        Credentials / <span className="text-primary">Edit access token</span>
        <div className="w-full flex flex-col items-center">
          <Card className="w-[492px] mt-7">
            <Typography.Header size={Size.H2}>Edit token</Typography.Header>
            <Typography.Header size={Size.H3}>
              Fill required details to regenerate access token.
            </Typography.Header>
            <Form className="flex flex-col mt-5">
              <Form.Label name="Name" className="text-xs mt-4" asideComponent={<Icon.Help />}>
                <Form.Input autoFocus placeholder="e.g. Bored Ape Yatch Club" />
                <Form.Error message="" />
              </Form.Label>

              <hr className="w-full bg-gray-500 my-4" color="#e6e6e6" />

              {/* TODO: Consider extraction to ui-library */}
              <span className="text-sm text-primary font-medium">Project access</span>
              <div className="flex flex-col gap-4 mt-4 mx-2">
                <div className="flex items-center gap-1">
                  <input type="radio" id="all_projects" name="project_access" value="HTML" />
                  <label htmlFor="all_projects" className="text-primary font-medium text-xs">
                    All projects
                  </label>
                </div>
                <div className="flex items-center gap-1">
                  <input type="radio" id="selected_projects" name="project_access" value="CSS" />
                  <label htmlFor="selected_projects" className="text-primary font-medium text-xs">
                    Only selected projects
                  </label>
                </div>
              </div>

              <Form.Label
                name="Select project"
                className="text-xs mt-5"
                asideComponent={<Icon.Help />}
              >
                <Form.Select
                  placeholder="e.g Dragon"
                  options={[
                    { option: 'Space fox', value: 'space_fox' },
                    { option: 'Cars', value: 'cars' },
                  ]}
                />
              </Form.Label>

              <hr className="w-full bg-gray-500 my-4" color="#e6e6e6" />

              <span className="text-sm text-primary font-medium">Permissions</span>
              <div className="grid grid-cols-2 mt-4 mx-2 gap-5">
                <Form.Checkbox id="project_created" label="Project created" />
                <Form.Checkbox id="project_deactivated" label="Project deactivated" />
                <Form.Checkbox id="invitation_sent" label="Invitation sent" />
                <Form.Checkbox id="invitation_accepted" label="Invitation accepted" />
                <Form.Checkbox id="invitation_revoked" label="Invitation revoked" />
                <Form.Checkbox id="credential_created" label="Credential created" />
              </div>

              <hr className="w-full bg-gray-500 my-4" color="#e6e6e6" />

              <div className="flex items-center justify-between">
                <Button className="self-start" variant="secondary">
                  Cancel
                </Button>
                <Button htmlType="submit" className="self-end">
                  Save changes
                </Button>
              </div>
            </Form>
          </Card>
        </div>
      </div>
    </div>
  );
}
