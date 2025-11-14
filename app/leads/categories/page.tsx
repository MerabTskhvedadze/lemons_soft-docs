'use client'

import React, {useState} from "react";

import {ScrollTrailText} from "@/animations/ScrollTrailText";
import {Separator} from "@/components/ui/separator";

import {Reorder} from 'motion/react'
import {
    MdDelete,
    MdEdit,
    MdInfoOutline,
    MdDragIndicator,
    MdPlaylistAdd,
    MdSave,
    MdCategory
} from "react-icons/md";

import {
    TextField,
    Switch,
    FormControlLabel,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Button,
    Box,
    Typography,
    Divider,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
} from "@mui/material";
import SaveIcon from '@mui/icons-material/Save';
import AddIcon from "@mui/icons-material/Add";
import {ColorPicker} from 'antd'

import {Button as CustomButton} from '@/components/ui/button'

/* ————— helpers დოკუმენტაციისთვის ————— */
function Section({title, children}: { title: string; children: React.ReactNode }) {
    return (
        <Box sx={{mb: 2.5}}>
            <Typography className={'title_font'}>{title}</Typography>
            {children}
        </Box>
    );
}

function Step({icon, title, desc}: { icon: React.ReactNode; title: string; desc: React.ReactNode }) {
    return (
        <ListItem>
            <ListItemIcon>{icon}</ListItemIcon>
            <ListItemText primary={title} secondary={desc}/>
        </ListItem>
    );
}

function Bullet({title, children}: { title: string; children: React.ReactNode }) {
    return (
        <ListItem>
            <ListItemIcon><MdInfoOutline/></ListItemIcon>
            <ListItemText
                primary={title}
                secondary={
                    <Typography variant="body2" color="text.secondary">
                        {children}
                    </Typography>
                }
            />
        </ListItem>
    );
}

function SmallPrint() {
    return (
        <Box sx={{color: 'text.secondary', fontSize: 12}}>
            <b>შენიშვნა:</b> კატეგორიების შეცვლის შემდეგ სასურველია გადაამოწმო, რომ ახალი სტრუქტურა
            სწორად აისახა იმ გვერდებზე/ანგარიშებში, სადაც ეს კატეგორიები გამოიყენება (დეშბორდი, ნომრების ბაზა და სხვ.).
        </Box>
    );
}

/* ————— მარჯვენა მხარეს ფორმა ————— */
function Form() {
    const [title, setTitle] = useState("");
    const [status, setStatus] = useState(true);

    return (
        <aside className="w-full h-fit rounded mt-2">
            <Button
                type="submit"
                variant="contained"
                startIcon={<AddIcon/>}
                className={'title_font self-start'}
                sx={{mb: 2}}
            >
                ახალი კატეგორიის დამატება
            </Button>

            {/* header with your fixed SVG */}
            <header className="py-3 px-5 flex items-center gap-2 bg-gray-100">
                <span className="title_font text-sm">კატეგორიის რედაქტირება</span>
            </header>

            <main className="py-3 px-5 flex flex-col gap-4 shadow">
                <div className={'flex items-center gap-10'}>
                    {/* Left column */}
                    <div className={'w-2/3 grow flex flex-col gap-3'}>
                        <div>
                            <p>სახელი</p>
                            <TextField
                                placeholder="კატეგორიის სახელი"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                fullWidth
                                size={'small'}
                            />
                        </div>

                        <div className={'grow flex items-center justify-between max-w-1/2'}>
                            <div className={'flex flex-col items-center gap-2'}>
                                <p>ტექსტის ფერი</p>
                                <ColorPicker defaultValue="#000000" size={'large'}/>
                            </div>

                            <div className={'flex flex-col items-center gap-2'}>
                                <p>ფონის ფერი</p>
                                <ColorPicker defaultValue="#000000" size={'large'}/>
                            </div>
                        </div>
                    </div>

                    {/* Right column */}
                    <div className={'w-1/3 flex flex-col gap-3'}>
                        {/* Top row: two switches aligned to screenshot style */}
                        <div>
                            <p>სტატუსი</p>
                            <FormControlLabel
                                sx={{m: 0}}
                                control={
                                    <Switch
                                        checked={status}
                                        onChange={(e) => setStatus(e.target.checked)}
                                    />
                                }
                                label=""
                            />
                        </div>

                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-helper-label">შაბლონი</InputLabel>
                            <Select
                                className={'title_font'}
                                labelId="demo-simple-select-helper-label"
                                id="demo-simple-select-helper"
                                value={'all'}
                                label="შაბლონი"
                                onChange={() => console.log('on change')}
                            >
                                <MenuItem className={'title_font'} value={'all'}>
                                    აჩვენოს ნომრების ბაზაში და შეხვედრებში
                                </MenuItem>
                                <MenuItem className={'title_font'} value={'only-meetings'}>
                                    აჩვენოს მხოლოდ შეხვედრებში
                                </MenuItem>
                                <MenuItem className={'title_font'} value={'only-number-base'}>
                                    აჩვენოს მხოლოდ ნომრების ბაზაში
                                </MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                </div>

                {/* Submit button bottom-left */}
                <Button
                    size={'small'}
                    type="submit"
                    variant="contained"
                    startIcon={<SaveIcon/>}
                    className={'title_font self-start'}
                >
                    შენახვა
                </Button>
            </main>
        </aside>
    );
}

/* ————— მთავარი გვერდი ————— */
export default function Categories() {
    const [sections, setSections] = useState([
        {id: "city-number", label: "ქალაქის ნომერი"},
        {
            id: "closed", label: "დახურული",
            items: [
                {id: "not-interested", label: "არ არის დაინტერესებული"},
                {id: "realtor", label: "რეალტორი"},
            ],
        },
        {
            id: "to-work", label: "სამუშაო",
            items: [
                {id: "online-meeting", label: "ონლაინ შეხვედრა"},
                {id: "builder", label: "მშენებელი"},
            ],
        },
    ])

    const handleSubReorder =
        (sectionId: string) =>
            (nextItems: any[]) => {
                const nextSections = sections.map((s) =>
                    s.id === sectionId ? {...s, items: nextItems} : s
                );
                setSections(nextSections);
            };

    return (
        <>
            {/* overview */}
            <header className="flex flex-col gap-3">
                <div className={'flex items-center gap-3'}>
                    <ScrollTrailText className={'title_font text-lg'}>
                        🔹 ლიდის კატეგორია
                    </ScrollTrailText>
                </div>

                <ScrollTrailText className="pl-5">
                    ეს გვერდი გამოიყენება <b>ატეგორიების სამართავად</b> - მარჯვენა მხარეს ხედავ
                    კატეგორიების და ქვეკატეგორიების სიას, რომელსაც შეგიძლია გადაანაცვლო Drag & Drop-ით, ხოლო მარცხენა
                    არსებული ფორმით ცვლი მათ დასახელებას, ფერებს, სტატუსს და გამოყენების შაბლონს.
                </ScrollTrailText>
            </header>

            <Separator className="my-5 bg-transparent"/>

            <section className={'flex justify-between items-start gap-3'}>
                {/* categories list + drag & drop */}
                <section>
                    <Reorder.Group
                        onReorder={setSections}
                        values={sections}
                        className={'shadow max-w-[364px] min-w-[344px] bg-gray-50 px-2 rounded-sm'}
                    >
                        {sections.map((section) => (
                            <Reorder.Item
                                value={section}
                                key={section.id}
                                className={'group p-2 border rounded-md my-2 cursor-grab active:cursor-grabbing bg-white hover:border-yellow-900'}
                            >
                                <div className={'flex items-center gap-2 group-hover:text-yellow-900'}>
                                    {section.label}
                                    <CustomButton size={'icon-sm'} variant={'ghost'} className={'ml-auto'}>
                                        <MdEdit color={'#737373'}/>
                                    </CustomButton>
                                </div>

                                {/* section subitems */}
                                {section.items &&
                                    <Reorder.Group
                                        values={section.items}
                                        onReorder={handleSubReorder(section.id)}
                                        className={'mt-2 flex flex-col gap-2 pl-3'}
                                    >
                                        {section.items.map((item: any) => (
                                            <Reorder.Item
                                                key={item.id}
                                                value={item}
                                                className={'group/inner flex items-center border p-2 rounded-md bg-white hover:border-yellow-700'}
                                            >
                                                <span className={'text-sm'}>{item.label}</span>
                                                <div className={'ml-auto inline-flex items-center'}>
                                                    <CustomButton size={'icon-sm'} variant={'ghost'}>
                                                        <MdEdit color={'#737373'}/>
                                                    </CustomButton>
                                                    <CustomButton size={'icon-sm'} variant={'ghost'}>
                                                        <MdDelete color={'#737373'}/>
                                                    </CustomButton>
                                                </div>
                                            </Reorder.Item>
                                        ))}
                                    </Reorder.Group>
                                }
                            </Reorder.Item>
                        ))}
                    </Reorder.Group>
                </section>

                <Form/>
            </section>

            <Separator className="my-5 bg-transparent"/>

            <section className={'pl-5'}>
                {/* გამოყენების ინსტრუქცია */}
                <Section title="გამოყენების ინსტრუქცია">
                    <List dense>
                        <Step
                            icon={<MdCategory/>}
                            title="არსებული კატეგორიები"
                            desc={
                                <>
                                    მარცხენა სვეტში წარმოდგენილია <b>კატეგორიების სიას</b> (მაგ: „ქალაქის ნომერი“,
                                    „დახურული“, „სამუშაო“)
                                    და თითოეულს ქვეშ, ქვეკატეგორიის არსებობის შემთხვევაში, გვხვდება <b>ქვეკატეგორიები</b>.
                                </>
                            }
                        />

                        <Step
                            icon={<MdPlaylistAdd/>}
                            title="ახალი კატეგორიის დამატება"
                            desc={
                                <>
                                    დააჭირე ზედა ღილაკს <b>„ახალი კატეგორიის დამატება“</b>, შეავსე ფორმა და ღილაკზე <b>„შენახვა“</b> დაკლიკებით დაამატე ახალი კატეგორია
                                </>
                            }
                        />

                        <Step
                            icon={<MdEdit/>}
                            title="არსებული კატეგორიის რედაქტირება"
                            desc={
                                <>
                                    სასურველ კატეგორიაზე დააჭირე <b>რედაქტირების ღილაკს</b> (✎).
                                    არჩეული კატეგორიის მონაცემები აისახება ფორმაში.
                                    დაარედაქტირე ტექსტი, ფერები ან შაბლონი და კიდევ ერთხელ დააკლიკე <b>„შენახვა“</b> ღილაკს.
                                </>
                            }
                        />

                        <Step
                            icon={<MdDelete/>}
                            title="ქვეკატეგორიის წაშლა"
                            desc={
                                <>
                                    ქვეკატეგორიის სტრიქონის ბოლოშია <b>წაშლის ღილაკი</b>. მისი დაჭერისას კონკრეტული
                                    სტრიქონი მოიშლება სიიდან.
                                    გამოიყენე მხოლოდ მაშინ, თუ ასეთი კატეგორია მომავალში აღარ დაგჭირდება.
                                </>
                            }
                        />

                        <Step
                            icon={<MdSave/>}
                            title="ცვლილებების შენახვა"
                            desc={
                                <>
                                    ფორმის ბოლოში მდებარე <b>„შენახვა“</b> ღილაკი ინახავს ცვლილებებს.
                                </>
                            }
                        />
                    </List>
                </Section>

                <Divider sx={{my: 3}}/>

                {/* ველების აღწერა */}
                <Section title="ველების აღწერა">
                    <List dense>
                        <Bullet title="სახელი">
                            კატეგორიის სახელი ჩანს სხვა მოდულებში. გამოიყენე მოკლე და კონკრეტული
                            ტექსტი (მაგ: „ონლაინ შეხვედრა“, „არ პასუხობს“, „დახურული“).
                        </Bullet>
                        <Bullet title="ტექსტის ფერი">
                            განსაზღვრავს კატეგორიის სახელის ფერს. გამოიყენე ისეთი ფერები, რომლებიც კარგად იკითხება
                            არჩეულ ფონზე.
                        </Bullet>
                        <Bullet title="ფონის ფერი">
                            კატეგორიის ბექგრაუნდი. სასურველია <b>კონტრასტული</b> არჩევანი, რომ ტექსტი მკაფიოდ
                            ჩანდეს.
                        </Bullet>
                        <Bullet title="სტატუსი (ჩართვა/გამორთვა)">
                            განსაზღვრავს აქტიურია თუ არა კატეგორიაი. გამორთული კატეგროია არ ჩანს სოფტში, წაშლის გარეშე.
                        </Bullet>
                        <Bullet title="შაბლონი">
                            განსაზღვრავს, <b>სად გამოჩნდეს</b> ეს კატეგორია: მხოლოდ შეხვედრებში, მხოლოდ ნომრების ბაზაში
                            ან ორივეგან.
                        </Bullet>
                    </List>
                </Section>

                <Divider sx={{my: 3}}/>

                {/* Drag & Drop დალაგება */}
                <Section title="Drag & Drop დალაგება">
                    <List dense>
                        <Step
                            icon={<MdDragIndicator/>}
                            title="ძირითადი კატეგორიების გადანაცვლება"
                            desc={
                                <>
                                    მარცხენა სიაში დააწექი კატეგორიის ბლოკს და <b>გადაიტანე</b> ზემოთ ან
                                    ქვემოთ.
                                    გაშვების შემდეგ ის გადავა ახალ პოზიციაზე. რიგითობა განსაზღვრავს, როგორ გამოჩნდება
                                    კატეგორიების სია სხვაგან.
                                </>
                            }
                        />
                        <Step
                            icon={<MdDragIndicator/>}
                            title="ქვეკატეგორიების გადანაცვლება"
                            desc={
                                <>
                                    თითოეულ კატეგორიაში ჩაშენებულია <b>ქვეკატეგორიების საკუთარი სია</b>.
                                    ქვეკატეგორიებიც იგივე ლოგიკით გადაადგილდება, რაც კატეგორიები.
                                    ასე შეგიძლია მოარგო კატეგორიბისის თანმიმდევრობა შენი სამუშაო პროცესის მიხედვით.
                                </>
                            }
                        />
                    </List>
                </Section>

                <Divider sx={{my: 3}}/>

                {/* კარგი პრაქტიკები */}
                <Section title="კარგი პრაქტიკები">
                    <List dense>
                        <Bullet title="ფერთა კონტასტის დაცვა">
                            არ გამოიყენოთ ერთმანეთთან „შერეული“ ნათელი ფერები. ტექსტი ყოველთვის კარგად უნდა ჩანდეს
                            მუქ/ღია ფონზე.
                        </Bullet>
                        <Bullet
                            title="არ შეასწორო კატეგორია, რომელიც უკვე ფართოდ გამოიყენება, ზედმეტი საჭიროების გარეშე">
                            პოპულარული და ფართოდ გამოყენებული კატეგორიის სახელის შეცვლამ შეიძლება ისტორიული
                            მონაცემების წაკითხვა გაართულოს. ასეთ ცვლილებებს გააკეთე გააზრებულად.
                        </Bullet>
                    </List>
                </Section>

                <Divider sx={{my: 3}}/>

                <SmallPrint/>
            </section>

            <Separator className="my-5 bg-transparent"/>

        </>
    )
}