'use client';

import React from 'react';
import {
    Box, Typography, Divider, List, ListItem, ListItemIcon, ListItemText, Alert, Chip
} from '@mui/material';
import {
    MdDragIndicator,
    MdLink,
    MdRule,
    MdVisibility,
    MdTouchApp,
    MdWarningAmber,
    MdInfoOutline
} from 'react-icons/md';

export default function DuplicatesDoc() {
    return (
        <Box sx={{paddingLeft:2.5}}>
            <Section title="დუბლების გაერთიანების ინსტრუქცია">
                <List dense>
                    <Step
                        icon={<MdVisibility />}
                        title="იპოვე დუბლიკატი"
                        desc="დუბლიკატია ლიდი რომელსაც აქვს ერთნაირი ნომერი ცრილისი ველში „ნომერი“. იგივე ნომრის მქონე სტრიქონები(დუბლები) შეიძლება შეერთდეს."
                    />
                    <Step
                        icon={<MdDragIndicator />}
                        title="დუბლის გაერთიანება"
                        desc="დააჭირე სტრიქონს და გადაიტანეე მონიშნულ ადგილზე(მსგავსი ნომერის მქონე სხვა სტრიქონზე)."
                    />
                    <Step
                        icon={<MdTouchApp />}
                        title="დადე აღებული დუბლი დანიშნულ სტრიქონზე"
                        desc="დანიშნულ სტრიქონი მონიშნულია მწვანედ და მიუთითებს რომ გაერთიანება შესაძლებელია."
                    />
                    <Step
                        icon={<MdLink />}
                        title="შედეგი"
                        desc={<>შედეგად სტრიქონი რომელიც გადაგვქონდა წაიშლება, ხოლო მონიშნულ რიგში **შეივსება მხოლოდ ცარიელი ველები** რიგის მონაცემებით რომელიც გადავიტანეთ.</>}
                    />
                </List>
            </Section>

            <Divider sx={{ my: 2 }} />

            <Section title="გაერთიანების წესები">
                <List dense>
                    <Rule title="მხოლოდ ერთნაირი ნომრებით">
                        გაერთიანება ხდება მხოლოდ მაშინ, როცა <b>ორივე სტრიქონში</b> ველი <Chip size="small" label="ნომერი" /> იდენტურია.
                    </Rule>
                    <Rule title="სტრიქონი რომელშიც გადაგვაქ დუბლი, პრიორიტეტულია">
                        თუ სტრიქონი რომელიც გადაგვაქ სხვა სტრიქონში **შევსებულია** ის **არ იცვლება**. ივსება მხოლოდ ის ველები რომლებიც ცარიელი იყო.
                    </Rule>
                    <Rule title="მონიშნული ელემენტი იშლება">
                        გაერთიანების შემდეგ გადატანილი სტრიქონი **იშლება** და გვრჩება მხოლოდ ერთი უნიკალური ნომერი.
                    </Rule>
                </List>
            </Section>

            <Divider sx={{ my: 2 }} />

            <Section title="ვიზუალური ნიშნები">
                <List dense>
                    <Step
                        icon={<MdWarningAmber />}
                        title="მწვანე ჩარჩო"
                        desc="მწვანე ჩარჩოიანი რიგი არის დანიშნულება, სადაც დუბლი უნდა ჩავარდეს."
                    />
                    <Step
                        icon={<MdInfoOutline />}
                        title="გამჭვირვალე"
                        desc="რიგი რომელიც გადაგვაქვს არის გამჭვირვალე."
                    />
                </List>
            </Section>

        </Box>
    );
}

/* helpers */
function Section({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <Box sx={{ mb: 1.5 }}>
            <Typography className={'title_font'}>{title}</Typography>
            {children}
        </Box>
    );
}

function Step({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: React.ReactNode }) {
    return (
        <ListItem>
            <ListItemIcon>{icon}</ListItemIcon>
            <ListItemText primary={title} secondary={desc} />
        </ListItem>
    );
}

function Rule({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <ListItem>
            <ListItemIcon><MdRule /></ListItemIcon>
            <ListItemText primary={title} secondary={<Typography variant="body2" color="text.secondary">{children}</Typography>} />
        </ListItem>
    );
}
