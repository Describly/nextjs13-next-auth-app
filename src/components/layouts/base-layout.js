import Providers from "../providers/Providers";

const { default: Navbar } = require("./navbar");

const BaseLayout = ({children}) => {
    return (
        <>
        <Providers>
            <Navbar />
            <div className="flex content-center justify-center h-screen pt-10">
                <main className="flex flex-col w-full max-w-lg gap-4">
                    {children}
                </main>
            </div>
        </Providers>
        </>
    );
}

export default BaseLayout;