export async function POST(req: Request) {
  try {
    return Response.json({"Message": req.body})
  } catch (error) {
    throw new Error("Something went wrong")
  }
}