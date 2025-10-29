import React from 'react'
import {FadeInSection} from "@/animations/FadeInSection";

export default function template({children}: { children: React.ReactNode }) {
    return (
        <FadeInSection>
            <section className="w-full pt-4 pb-8">
                <div className="mx-auto ">
                    {children}
                </div>
            </section>
        </FadeInSection>
    );
}