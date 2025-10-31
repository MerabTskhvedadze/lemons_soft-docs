'use client'

import React from 'react'
import {Separator} from '@/components/ui/separator'
import {ScrollTrailText} from '@/animations/ScrollTrailText'

export default function Menu(){
    return (
        <>
            {/* overview */}
            <header className="flex flex-col gap-3 tour-intro">
                <div>
                    <h1 className="title_font text-lg">
                        <ScrollTrailText>🔹 გვერდის დანიშნულება</ScrollTrailText>
                    </h1>
                    <ScrollTrailText className="pl-5">
                        დეშბორდის გვერდი წარმოადგენს სისტემის მთავარ მონიტორინგის პანელს, სადაც მომხმარებელი
                        ხედავს დღის სტატისტიკას, ზარების რაოდენობას, შეხვედრებს, ქოლცენტრის და გაყიდვების აქტივობას,
                        ასევე
                        პირად და გუნდურ შედეგებს. გვერდი განკუთვნილია ოპერატორებისთვის, მენეჯერებისთვის და
                        ადმინისტრატორებისთვის - სამუშაო
                        პროცესის ყოველდღიური კონტროლისთვის.
                    </ScrollTrailText>
                </div>
            </header>

            <Separator className="my-5"/>

        </>
    )
}
