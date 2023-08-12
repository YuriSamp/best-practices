// import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
// import * as z from 'zod'
// import { cookies } from 'next/headers'

// export async function PUT(req: Request) {
//   const supabase = createRouteHandlerClient({ cookies })

//   try {
//     const session = await supabase.auth.getSession()
//     const userId = session.data.session?.user.id

//     if (userId === null) {
//       return new Response('Unauthorized', { status: 403 })
//     }

//     // const json = await req.json()
//     // const body = z.string().parse(json)

//     // await clerkClient.users.updateUser(userId, { password: body })

//     return new Response(null, { status: 200 })
//   } catch (error) {
//     console.log(error)
//     if (error instanceof z.ZodError) {
//       return new Response(JSON.stringify(error.issues), { status: 422 })
//     }

//     return new Response(null, { status: 500 })
//   }
// }

// export async function DELETE() {
//   try {
//     const { userId } = auth()

//     if (userId === null) {
//       return new Response('Unauthorized', { status: 403 })
//     }

//     await clerkClient.users.deleteUser(userId)

//     return new Response(null, { status: 204 })
//   } catch (error) {
//     if (error instanceof z.ZodError) {
//       return new Response(JSON.stringify(error.issues), { status: 422 })
//     }
//     return new Response(null, { status: 500 })
//   }
// }
