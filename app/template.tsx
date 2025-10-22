import React from 'react'

export default function template({children}: { children: React.ReactNode }) {
    return (
        <section className="max-w-screen-lg w-full pt-4">
            <div className="mx-auto max-w-[50rem]">
                {children}
            </div>
        </section>
    );
}