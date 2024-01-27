import {
  PieceAuth,
  TriggerStrategy,
  createTrigger,
} from '@activepieces/pieces-framework';

export const newCaptureNote = createTrigger({
  auth: PieceAuth.None(),
  name: 'new_capture_note',
  displayName: 'New Capture Note',
  description: 'Triggered when a new capture note is created',
  props: {},
  type: TriggerStrategy.WEBHOOK,
  sampleData: {
    id: 1,
    title: 'Capture Note',
    user_id: 'user1',
    raw_body: 'This is a capture note',
    generated_body: 'This is a capture note',
    generated_actions: {},
    generated_summary: 'This is a generated summary',
    state: 'unprocessed',
    metadata: {},
    created_at: '2021-07-30T07:59:59.000Z',
    updated_at: '2021-07-30T07:59:59.000Z',
  },
  async onEnable(context) {
    const EVA_URL = 'http://localhost:11000';

    const payload = {
      id: Buffer.from(context.webhookUrl).toString('base64'),
      url: context.webhookUrl,
    };

    // Post the webhook payload
    const response = await fetch(`${EVA_URL}/api/v1/webhooks`, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.status !== 200) {
      throw new Error(`Failed to create webhook: ${response.status}`);
    }
  },
  async onDisable(context) {
    const EVA_URL = 'http://localhost:11000';

    // Base64 encode the webhook url
    const id = Buffer.from(context.webhookUrl).toString('base64');

    // Delete the webhook
    await fetch(`${EVA_URL}/api/v1/webhooks/${id}`, {
      method: 'DELETE',
    });
  },
  async run(context) {
    const body = context.payload.body as { note: CaptureNote };
    return [body.note];
  },
});

interface CaptureNote {
  id: number;
  title: string;
  user_id: string;
  raw_body: string;
  generated_body: string;
  generated_actions: Record<string, unknown>;
  generated_summary: string;
  state: string;
  metadata: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}
