export function CardContainer({ children }: { children: React.ReactNode }) {
    return(
        <div className="w-full border rounded-lg p-4">
            {children}
        </div>
    )
}