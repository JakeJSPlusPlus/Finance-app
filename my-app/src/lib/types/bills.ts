
export type Bill = {
    id: string;
    name: string;
    amount: number | null;
    dueDate: Date | null;
    frequency: string | null;
}

export type BillOverride = {
    amount: number| null;
    dueDate: string | null;
}
export interface BillsQueryData {
    billsCollection: {
        edges: {
            node: {
                id: string;
                name: string;
                amount: string;
                scheduled_on: string;
                frequency: {
                    name: string;
                };
            };
        }[];
    };
}