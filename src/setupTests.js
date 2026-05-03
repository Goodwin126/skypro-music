import "@testing-library/jest-dom/vitest";
import { transferableAbortController } from "node:util";

const nodeFetch = globalThis.fetch;
const nodeHeaders = globalThis.Headers;
const nodeRequest = globalThis.Request;
const nodeResponse = globalThis.Response;
const abortController = transferableAbortController();
const nodeAbortController = abortController.constructor;
const nodeAbortSignal = abortController.signal.constructor;

Object.assign(globalThis, {
  fetch: nodeFetch,
  Headers: nodeHeaders,
  Request: nodeRequest,
  Response: nodeResponse,
  AbortController: nodeAbortController,
  AbortSignal: nodeAbortSignal,
});

if (typeof window !== "undefined") {
  Object.assign(window, {
    fetch: nodeFetch,
    Headers: nodeHeaders,
    Request: nodeRequest,
    Response: nodeResponse,
    AbortController: nodeAbortController,
    AbortSignal: nodeAbortSignal,
  });
}
