
export const metadata = {
  title: 'User Dashboard',
  description: 'Manage your projects and account details.',
}

export default function DashboardPage() {
    return (
        <div className="container py-12 md:py-16">
            <h1 className="text-3xl md:text-4xl font-extrabold font-headline mb-8">Dashboard</h1>
            <div className="bg-secondary p-8 rounded-lg text-center">
                <h2 className="text-2xl font-semibold">Welcome to your dashboard!</h2>
                <p className="mt-2 text-muted-foreground">Architect-specific features are coming soon.</p>
            </div>
        </div>
    )
}
