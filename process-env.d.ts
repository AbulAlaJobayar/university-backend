declare namespace NodeJS{
    export type ProcessEnv={
        NODE_ENV:string
        PORT:number
        DATABASE_URL:string
       BCRYPT_SLAT_ROUND:number,
       ACCESS_TOKEN_SECRET:string
       ACCESS_TOKEN_EXPIRE_IN:string
    }
}