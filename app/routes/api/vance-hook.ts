import { useParams } from "react-router";
import { LoaderFunctionArgs } from "react-router";
import { param } from "drizzle-orm";

export async function loader({ request }: LoaderFunctionArgs) {
  console.log("Vance Loader Hook");
  let { searchParams } = new URL(request.url);
  console.log(
    "Vance Hook Data",

    searchParams.get("trans_id")
  );
  return Response.json({
    message: searchParams.get("trans_id"),
  });
}

export async function action({ request }: LoaderFunctionArgs) {
  console.log("Vance Action Hook");
  let { searchParams } = new URL(request.url);
  console.log(
    "Vance Hook Data",

    searchParams.get("trans_id")
  );
  return Response.json({
    message: searchParams.get("trans_id"),
  });
}
