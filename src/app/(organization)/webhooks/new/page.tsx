'use client';
import { Button, Form } from '@holaplex/ui-library-react';
import Card from '../../../../components/Card';
import { Icon } from '../../../../components/Icon';
import Typography, { Size } from '../../../../components/Typography';

export default function NewWebhook() {
  return (
    <div className="h-full flex flex-col p-4">
      <div className="text-2xl font-medium text-gray-500">
        Webhooks / <span className="text-primary">Add Webhook</span>
        <div className="w-full flex flex-col items-center">
          <Card className="w-[492px] mt-7">
            <Typography.Header size={Size.H2}>Webhook details</Typography.Header>
            <Typography.Header size={Size.H3}>
              Select the projects to which you want to add the webhook
            </Typography.Header>
            <Form className="flex flex-col mt-5">
              <Form.Label name="Project" className="text-xs mt-4" asideComponent={<Icon.Help />}>
                <Form.Input autoFocus placeholder="e.g. Space fox" />
                <Form.Error message="" />
              </Form.Label>
              <div className="flex gap-4 mt-5">
                <Form.Label name="Name" className="text-xs mt-5" asideComponent={<Icon.Help />}>
                  <Form.Input autoFocus placeholder="e.g. Bored Ape Yatch Club" />
                  <Form.Error message="" />
                </Form.Label>

                <Form.Label
                  name="Target URL"
                  className="text-xs mt-5"
                  asideComponent={<Icon.Help />}
                >
                  <Form.Input />
                  <Form.Error message="" />
                </Form.Label>
              </div>

              <hr className="w-full bg-gray-500 my-4" color="#e6e6e6" />

              <span className="text-sm text-primary font-medium">Events</span>
              <div className="grid grid-cols-2 mt-4 mx-2">
                <Form.Checkbox
                  id="project_created"
                  label={<span className="text-xs font-medium text-primary">Project created</span>}
                />
                <Form.Checkbox
                  id="project_deactivated"
                  label={
                    <span className="text-xs font-medium text-primary">Project deactivated</span>
                  }
                />
                <Form.Checkbox
                  id="invitation_sent"
                  label={<span className="text-xs font-medium text-primary">Invitation sent</span>}
                />
                <Form.Checkbox
                  id="invitation_accepted"
                  label={
                    <span className="text-xs font-medium text-primary">Invitation accepted</span>
                  }
                />
                <Form.Checkbox
                  id="invitation_revoked"
                  label={
                    <span className="text-xs font-medium text-primary">Invitation revoked</span>
                  }
                />
                <Form.Checkbox
                  id="credential_created"
                  label={
                    <span className="text-xs font-medium text-primary">Credential created</span>
                  }
                />
              </div>

              <hr className="w-full bg-gray-500 my-4" color="#e6e6e6" />

              <span className="text-sm text-primary font-medium mb-4">Secret key</span>

              <div className="flex gap-2 items-center">
                <Form.Input className="w-full" />
                <span className="bg-gray-100 p-3 rounded-md cursor-pointer">
                  <Icon.Copy />
                </span>
              </div>

              <hr className="w-full bg-gray-500 my-4" color="#e6e6e6" />

              <div className="flex items-center justify-between">
                <Button className="self-start" variant="secondary">
                  Cancel
                </Button>
                <Button htmlType="submit" className="self-end" variant="secondary">
                  Add
                </Button>
              </div>
            </Form>
          </Card>
        </div>
      </div>
    </div>
  );
}
