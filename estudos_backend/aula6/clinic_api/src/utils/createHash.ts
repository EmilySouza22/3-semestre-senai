const saltRound = 10;
import bcrypt from "bcrypt"

export async function createHash(senha: string) : Promise<string> {
    const senhaComHash = await bcrypt.hash(senha, saltRound)
    return senhaComHash
}