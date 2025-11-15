import { useAuth } from "@/hooks/useAuth";

export function Profile(){
    const { user } = useAuth();

    return(
        <div className="flex justify-center items-center gap-4">
            <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-300 flex items-center justify-center">
                <img src="https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y" alt="Imagem de Perfil" />
            </div>
            <span>{user?.name}</span>
        </div>
    )
}