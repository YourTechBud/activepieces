/* eslint-disable @typescript-eslint/no-explicit-any */

// Define an interface for StandardResponse schema
export interface StandardResponse {
  message: string; // A string
  error: any;
}

// Define an interface for ChatCompletionMessageFunctionCall schema
export interface ChatCompletionMessageFunctionCall {
  arguments: string; // A string
  name: string; // A string
}

// Define an interface for ChatCompletionRequestMessage schema
export interface ChatCompletionRequestMessage {
  content?: string; // A string or undefined
  function_call?: ChatCompletionMessageFunctionCall; // A ChatCompletionMessageFunctionCall or undefined
  name?: string; // A string or undefined
  role: string; // A string and one of ['system', 'user', 'assistant', 'function']
}


// Define an interface for ChatCompletionFunctions schema
export interface ChatCompletionFunctions {
  description: string; // A string
  name: string; // A string
  parameters: Record<string, any>; // A Record with string keys and any values
}

// Define an interface for ChatCompletionResponseMessage schema
export interface ChatCompletionResponseMessage {
  content?: string; // A string or undefined
  function_call?: ChatCompletionMessageFunctionCall; // A ChatCompletionMessageFunctionCall or undefined
  role: string; // A string and one of ['system', 'user', 'assistant', 'function']
}

// Define an interface for CreateChatCompletionChoice schema
export interface CreateChatCompletionChoice {
  finish_reason: string; // A string and one of ["stop", "length", "function_call", "content_filter"]
  index: number; // A number
  message: ChatCompletionResponseMessage; // A ChatCompletionResponseMessage
}

// Define an interface for CompletionUsage schema
export interface CompletionUsage {
  completion_tokens: number; // A number
  prompt_tokens: number; // A number
  total_tokens: number; // A number
}

// Define an interface for CreateChatCompletionResponse schema
export interface CreateChatCompletionResponse {
  id: string; // A string
  choices: CreateChatCompletionChoice[]; // An array of CreateChatCompletionChoice
  created: number; // A number
  model: string; // A string
  object: string; // A string
  usage: CompletionUsage; // A CompletionUsage
}

// Define an interface for RunInferenceContext schema
export interface RunInferenceContext {
    id: string;
    key: string;
}

// Define an interface for AddTextInstruction schema
export interface AddTextInstruction {
    text: string;
    include_in_output: boolean;
}

// Define an interface for ConversationOptions schema
export interface ConversationOptions {
    // Store key will add the inference response to the conversation history
    store_key?: string;

    // Load key will load the conversation from the conversation history
    load_key?: string;

    // Assistant is used to determine how each message needs to be loaded.
    // Messages with the assitant will be passed with role "assistant" while other will be
    // passed with role "user"
    assistant_name: string;
}

// Define an interface for RunInferenceInstructions schema
export interface RunInferenceInstructions {
    force_json?: boolean; // TODO: Implement this
    conversation?: ConversationOptions;
    add_prefix?: AddTextInstruction;
    add_suffix?: AddTextInstruction;
    enable_lateral_stream?: boolean;
    check_for_dedup?: boolean; // TODO: Implement this
}

// Define an interface for RunInferenceRequest schema
export interface RunInferenceRequest {
    context: RunInferenceContext;
    messages: ChatCompletionRequestMessage[];
    model: string;
    num_ctx?: number;
    temperature?: number;
    top_p?: number;
    top_k?: number;
    functions?: ChatCompletionFunctions[];
    stream?: boolean;
    instructions?: RunInferenceInstructions;
}

interface ModelDetails {
  format: string;
  family: string;
  families: string[];
  parameter_size: string;
  quantization_level: string;
}

interface Model {
  name: string;
  modified_at: string;
  size: number;
  digest: string;
  details: ModelDetails;
}

export interface ListModelsResponse {
  models: Model[];
}