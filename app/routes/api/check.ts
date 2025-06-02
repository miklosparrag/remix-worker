import { LoaderFunctionArgs } from "@remix-run/server-runtime";
import { ContextMenuButton } from "sanity";
import { vanceProcess } from "~/components/ai/VanceAiClient";

export async function loader({ context }: LoaderFunctionArgs) {
  const ret = await vanceProcess(context);
  return Response.json({
    updated: ret,
  });
}

export async function action({ context }: LoaderFunctionArgs) {
  const ret = await vanceProcess(context);
  return Response.json({
    updated: ret,
  });
}
