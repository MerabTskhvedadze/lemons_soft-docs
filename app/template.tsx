import React from 'react'

export default function template({children}: { children: React.ReactNode }) {
    return (
        <section className="w-full pt-4">
            <div className="mx-auto ">
                {children}
            </div>
        </section>
    );
}