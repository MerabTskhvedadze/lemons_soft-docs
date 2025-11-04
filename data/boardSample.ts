import type { BoardState } from "@/types/board";

export const initialBoard: BoardState = {
    columns: [
        {
            id: "TA2Ng",
            title: "კომერციულები",
            items: [
                { id: "my_commercial", title: "ჩემი განაცხადები", note: "Key: my_commercial" },
                { id: "commercial", title: "ყველა კომერციული", note: "Key: commercial" },
            ],
        },
        {
            id: "DMzNw",
            title: "შეხვედრები",
            items: [
                { id: "meetings_mynumbers", title: "ჩემი განაცხადები", note: "Key: meetings_mynumbers" },
                { id: "meetings_numbers", title: "ყველა შეხვედრა", note: "Key: meetings_numbers" },
            ],
        },
    ],
};
