import { UtensilsCrossed, Menu, X } from "lucide-react";
import { Container } from "../Container";
import { AppNav } from "../AppNav";
import { Profile } from "../Profile";
import { useState } from "react";

export function Header(){
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return(
        <header className="w-full h-20 bg-background border-b flex items-center">
            <Container>
                <div className="flex items-center justify-between w-full">
                    {/* Logo */}
                    <div className="flex items-center justify-center gap-4">
                        <UtensilsCrossed className="w-8 h-8 text-blue-500" />
                        <h1 className="font-semibold text-2xl">Book Now</h1>
                    </div>
                    
                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        <AppNav/>
                        <Profile/>
                    </div>

                    {/* Mobile Menu Button */}
                    <button 
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        aria-label="Toggle menu"
                    >
                        {isMenuOpen ? (
                            <X className="w-6 h-6" />
                        ) : (
                            <Menu className="w-6 h-6" />
                        )}
                    </button>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="md:hidden absolute top-20 left-0 right-0 bg-white border-b shadow-lg z-50">
                        <div className="flex flex-col p-4 gap-4">
                            <AppNav/>
                            <div className="pt-4 border-t">
                                <Profile/>
                            </div>
                        </div>
                    </div>
                )}
            </Container>
        </header>
    )
}