export interface IProduct {
    type: string;
    id: string;
    attributes: IAttribute;
}

export interface IAttribute {
    id: string;
    sku: string;
    name: string;
    price: string;
    weight: number;
    height: number;
    length: number;
    width: number;
    customs_price: string;
    country_of_origin: string;
    hs_code: string;
    notes: string;
    quantity_on_hand: number;
    quantity_allocated: number;
    quantity_available: number;
    created_at: string;
    deleted_at: string;
    updated_at: string;
    quantity_backordered: number;
    createdAt: string;
    updatedAt: string;
    locations: any[];
    barcode: string;
    images: any[];
    priority_counting_requested_at: string;
    priority_counting_requested_at_change: string;
    customer: ICustomer;
}

export interface ICustomer {
    id: number;
    parent_id: string;
    created_at: string;
    updated_at: string;
    deleted_at: string;
    parent: string;
    allow_child_customers: number;
    contact_information: IContactInfo;
}

export interface IContactInfo {
    id: number;
    object_type: string;
    object_id: number;
    name: string;
    company_name: string;
    company_number: string;
    address: string;
    address2: string;
    zip: string;
    city: string;
    email: string;
    phone: string;
    created_at: string;
    updated_at: string;
    deleted_at: string;
    country_id: string;
}
