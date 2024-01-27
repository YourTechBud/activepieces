import { createPiece, PieceAuth } from '@activepieces/pieces-framework';
import { newCaptureNote } from './lib/triggers/new-capture-note';
import { updateCaptureNote } from './lib/actions/update-capture-note';

export const eva = createPiece({
  displayName: 'Eva AI',
  auth: PieceAuth.None(),
  minimumSupportedRelease: '0.9.0',
  logoUrl: 'https://space-cloud.io/images/kit/logo.svg',
  authors: [],
  actions: [updateCaptureNote],
  triggers: [newCaptureNote],
});
