const role={
    user:'user',
    admin:'admin'
}as const

export type User_role=  typeof role[keyof typeof role]