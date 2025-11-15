import { Container } from "../Container";

export function Header(){
    return(
        <header className="w-full h-20 bg-background border-b flex items-center">
            <Container>
                <div className="flex items-center justify-between w-full">
                    <div>a</div>
                    <div>b</div>
                </div>
            </Container>
        </header>
    )
}