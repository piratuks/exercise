import { OverlayEventDetail } from '@ionic/core';
import {
    IonBadge,
    IonButton,
    IonButtons,
    IonContent,
    IonFooter,
    IonHeader,
    IonInput,
    IonItem,
    IonLabel,
    IonModal,
    IonTitle,
    IonToolbar,
} from '@ionic/react';
import { useRef } from 'react';
import './NewProduct.css';
import { useForm } from 'react-hook-form';

export interface IModal {
    closedCallback: (result: boolean, data: INewProject | null) => void;
    isOpen: boolean;
}

export interface INewProject {
    customer_id: number;
    sku: string;
    name: string;
    price: number;
}

const NewProduct: React.FC<IModal> = (prop) => {
    const modal = useRef<HTMLIonModalElement>(null);

    let {
        register,
        handleSubmit,
        control,
        formState: { errors },
        reset,
    } = useForm({
        mode: 'onTouched',
        reValidateMode: 'onChange',
    });

    function onWillDismiss(ev: CustomEvent<OverlayEventDetail>) {
        if (ev.detail.role === 'confirm') {
            prop.closedCallback(true, ev.detail.data);
        } else {
            prop.closedCallback(false, null);
        }
        reset((formValues) => ({ ...formValues, sku: null, name: null, price: null }), {
            keepErrors: false,
            keepDirty: false,
        });
    }

    const onFormSubmit = (data: any) => {
        data.customer_id = 3;
        data.price = Number(data.price);
        modal.current?.dismiss(data, 'confirm');
    };

    return (
        <IonModal isOpen={prop.isOpen} ref={modal} trigger='open-modal-product' onWillDismiss={(ev) => onWillDismiss(ev)}>
            <form onSubmit={handleSubmit(onFormSubmit)}>
                <IonHeader>
                    <IonToolbar>
                        <IonTitle>New Product</IonTitle>
                        <IonButtons slot='end'>
                            <IonButton onClick={() => modal.current?.dismiss()}>Cancel</IonButton>
                        </IonButtons>
                    </IonToolbar>
                </IonHeader>
                <IonContent className='ion-padding'>
                    <IonItem>
                        <IonLabel position='stacked'>SKU*</IonLabel>
                        <IonInput {...register('sku', { required: true })} aria-invalid={errors.sku ? 'true' : 'false'} />
                        {errors.sku?.type === 'required' && <IonBadge color='danger'>Sku is required</IonBadge>}
                    </IonItem>
                    <IonItem>
                        <IonLabel position='stacked'>Name*</IonLabel>
                        <IonInput {...register('name', { required: true })} aria-invalid={errors.name ? 'true' : 'false'} />
                        {errors.name?.type === 'required' && <IonBadge color='danger'>Name is required</IonBadge>}
                    </IonItem>
                    <IonItem>
                        <IonLabel position='stacked'>Price*</IonLabel>
                        <IonInput {...register('price', { required: true })} type='number' aria-invalid={errors.name ? 'true' : 'false'} />
                        {errors.price?.type === 'required' && <IonBadge color='danger'>Price is required</IonBadge>}
                    </IonItem>
                </IonContent>
                <IonFooter>
                    <IonToolbar>
                        <IonButton strong={true} type='submit' disabled={false}>
                            Confirm
                        </IonButton>
                    </IonToolbar>
                </IonFooter>
            </form>
        </IonModal>
    );
};

export default NewProduct;
