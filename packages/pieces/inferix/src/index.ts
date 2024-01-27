
import { createPiece, PieceAuth } from "@activepieces/pieces-framework";
import { runInference } from "./lib/actions/run-inference";
import { clearConversationHistory } from "./lib/actions/clear-conversation-history";
import { clearResult } from "./lib/actions/clear-result";
import { clearContext } from "./lib/actions/clear-context";

export const inferix = createPiece({
  displayName: "Inferix",
  auth: PieceAuth.None(),
  minimumSupportedRelease: '0.9.0',
  logoUrl: "https://space-cloud.io/images/kit/logo.svg",
  authors: [],
  actions: [runInference, clearConversationHistory, clearResult, clearContext],
  triggers: [],
});
