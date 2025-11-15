import { UtensilsCrossed } from "lucide-react";
import { Container } from "../Container";
import { AppNav } from "../AppNav";
import { Profile } from "../Profile";

export function Header(){
    return(
        <header className="w-full h-20 bg-background border-b flex items-center">
            <Container>
                <div className="flex items-center justify-between w-full">
                    <div className="flex items-center justify-center gap-8">
                        <div className="flex items-center justify-center gap-4">
                            <UtensilsCrossed className="w-8 h-8 text-blue-500" />
                            <h1 className="font-semibold text-2xl">Book Now</h1>
                        </div>
                        
                        <AppNav/>
                    </div>
                    
                    <Profile/>
                </div>
            </Container>
        </header>
    )
}