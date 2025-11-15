import { Container } from "@/components/Container";
import { Header } from "@/components/Header";
import { Outlet } from "react-router-dom";

export default function AppLayout() {
    return(
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">
                <Container>
                    <Outlet />
                </Container>
            </main>
        </div>
    )
}