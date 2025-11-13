import {ScrollTrailText} from "@/animations/ScrollTrailText";
import {Box, List, ListItem, ListItemIcon, ListItemText} from "@mui/material";
import {
    MdAddCircleOutline, MdCached,
    MdCancel,
    MdEdit,
    MdFilterList,
    MdOutlineSaveAlt, MdPhoneIphone, MdRefresh,
    MdSave, MdSearch,
    MdViewColumn
} from "react-icons/md";
import React from "react";

/* ---------- Helpers ---------- */
function InlineIcon({children}: { children: React.ReactNode }) {
    return (
        <Box component="span" sx={{display: 'inline-flex', verticalAlign: 'middle', mx: 0.5}}>
            {children}
        </Box>
    );
}

export default function TableDocs(){
    return (
        <>
            <section>
                <ScrollTrailText className="pl-5 title_font">
                    ცხრილის ძირითადი ფუნქციები
                </ScrollTrailText>
                <List>
                    <ListItem>
                        <ListItemIcon><MdFilterList size={18}/></ListItemIcon>
                        <ListItemText
                            primary="ფილტრაცია სვეტიდან"
                            secondary={
                                <>
                                    თარიღზე გამოიყენეთ დიაპაზონი - "დაწყება" / "დასრულება".
                                    ტექსტურ ველებში შეიყვანეთ საძიებო სიტყვა. ჩამოსაშლელებში აირჩიეთ „ყველა“ ან
                                    კონკრეტული მნიშვნელობა.
                                </>
                            }
                        />
                    </ListItem>

                    <ListItem>
                        <ListItemIcon><MdEdit size={18}/></ListItemIcon>
                        <ListItemText
                            primary="რედაქტირება"
                            secondary={
                                <>
                                    მარჯვენა სვეტიდან გახსენით ✏️ ცვლილებების შესანახად დააჭირეთ{' '}
                                    <InlineIcon><MdSave/></InlineIcon> „შენახვა“, უკან დასაბრუნებლად -{' '}
                                    <InlineIcon><MdCancel/></InlineIcon> „გაუქმება“.
                                </>
                            }
                        />
                    </ListItem>

                    <ListItem>
                        <ListItemIcon><MdAddCircleOutline size={18}/></ListItemIcon>
                        <ListItemText
                            primary="ახალი რიგი"
                            secondary="ზედა პანელზე დამატების ღილაკი ქმნის ცარიელ სტრიქონს ცხრილში"
                        />
                    </ListItem>

                    <ListItem>
                        <ListItemIcon><MdViewColumn size={18}/></ListItemIcon>
                        <ListItemText
                            primary="სვეტების მართვა"
                            secondary="ღილაკიდან დამალეთ/გამოაჩინეთ სასურველი სვეტები ცხრილში."
                        />
                    </ListItem>

                    <ListItem>
                        <ListItemIcon><MdOutlineSaveAlt size={18}/></ListItemIcon>
                        <ListItemText
                            primary="ექსპორტი"
                            secondary="აკეთებს ექსპოერტს ექსელ ფაილში მიმდინარე ცხრილის მიხედვით"
                        />
                    </ListItem>

                    <ListItem>
                        <ListItemIcon><MdRefresh size={18}/></ListItemIcon>
                        <ListItemText
                            primary="ცხრილის განახლება"
                            secondary="ხელახლა ტვირთავს მონაცემებს ცხრილში"
                        />
                    </ListItem>

                    <ListItem>
                        <ListItemIcon><MdCached size={18}/></ListItemIcon>
                        <ListItemText
                            primary="განახლება"
                            secondary="სრული განახლება (შლის ბრაუზერის ქეშს)"
                        />
                    </ListItem>
                </List>
            </section>

            <section>
                <ScrollTrailText className="pl-5 title_font">
                    კარგი პრაქტიკები
                </ScrollTrailText>
                <List>
                    <ListItem>
                        <ListItemIcon><MdPhoneIphone size={18}/></ListItemIcon>
                        <ListItemText
                            primary="ნომრის ფორმატი"
                            secondary="ტელეფონი შეიყვანეთ ფორმატით: +995..."
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemIcon><MdSearch size={18}/></ListItemIcon>
                        <ListItemText
                            primary="დუბლიკატების თავიდან აცილება"
                            secondary="ახალი რიგის ჩამატებამდე მოძებნეთ ნომერი „მობილურის“ ფილტრით."
                        />
                    </ListItem>
                </List>
            </section>
        </>
    )
}