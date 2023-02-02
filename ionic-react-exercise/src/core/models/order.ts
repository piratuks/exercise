import { ICustomer } from './product';

export interface IOrder {
    type: string;
    id: string;
    attributes: IAttribute;
    relationships: IRelationship;
    links: {
        self: string;
    };
}

export interface IRelationship {
    customer: {
        data: {
            type: string;
            id: string;
        };
    };
    shipments: {
        data: any[];
    };
    shipping_contact_information: {
        data: {
            type: string;
            id: string;
        };
    };
    billing_contact_information: {
        data: {
            type: string;
            id: string;
        };
    };
    order_lock_information: {
        data: any[];
    };
}

export interface IAttribute {
    external_id: string;
    order_status_id: number;
    status: string;
    number: string;
    ordered_at: string;
    required_shipping_date_at: string;
    shipping_date_before_at: string;
    notes: string;
    priority: number;
    created_at: string;
    updated_at: string;
    deleted_at: string;
    shipping_priority_score: number;
    shipping_method_name: string;
    gift_notes: string;
    tags: any[];
    fraud_hold: number;
    address_hold: number;
    payment_hold: number;
    operator_hold: number;
    allow_partial: number;
    ready_to_ship: number;
    customer: ICustomer;
    order_items: IOrderItems[];
    shipments: any[];
    shipping_contact_information: IShippingInfo;
    billing_contact_information: IShippingInfo;
    order_lock_information: string;
    createdAt: string;
    updatedAt: string;
}

export interface IShippingInfo {
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

export interface IOrderItems {
    id: number;
    order_id: number;
    product_id: number;
    quantity: number;
    quantity_shipped: number;
    quantity_returned: number;
    quantity_pending: number;
    created_at: string;
    updated_at: string;
    deleted_at: string;
    quantity_allocated: number;
    quantity_backordered: number;
    sku: string;
    name: string;
    price: string;
    weight: number;
    height: number;
    length: number;
    width: number;
    order_item_kit_id: string;
    external_id: string;
    cancelled_at: string;
    product: IProduct;
    tote_order_items: any[];
    picking_batch_items: any[];
}

export interface IProduct {
    id: number;
    customer_id: number;
    sku: string;
    name: string;
    price: string;
    notes: string;
    quantity_on_hand: number;
    quantity_allocated: number;
    quantity_available: number;
    value: string;
    customs_price: string;
    hs_code: string;
    created_at: string;
    deleted_at: string;
    updated_at: string;
    quantity_backordered: number;
    weight: number;
    height: number;
    length: number;
    width: number;
    barcode: string;
    country_of_origin: string;
    is_kit: number;
    priority_counting_requested_at: string;
    reorder_threshold: number;
    quantity_reorder: number;
    last_counted_at: string;
    locations: any[];
    product_images: any[];
}
