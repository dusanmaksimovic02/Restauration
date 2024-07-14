import React, { createContext, useState, useContext } from "react";

export type OrderItemm = {
  orderId?: number;
  id: number;
  type: string;
  slika: string;
  naziv: string;
  sastojci: string;
  cena: number;
  kolicina: number;
  vremePripreme: number;
};

type OrderContextType = {
  orderItems: OrderItemm[];
  addToOrder: (item: OrderItemm) => void;
  removeFromOrder: (itemId: number) => void;
  emptyOrder: () => void;
  isItemInOrder: (itemId: number) => boolean;
};

const OrderContext = createContext<OrderContextType>({
  orderItems: [],
  addToOrder: () => {},
  removeFromOrder: () => {},
  emptyOrder: () => {},
  isItemInOrder: (itemId: number) => false,
});

type Props = { children: React.ReactNode };

export const useOrder = () => useContext(OrderContext);

export const OrderProvider = ({ children }: Props) => {
  const [orderItems, setOrderItems] = useState<OrderItemm[]>([]);

  const addToOrder = (item: OrderItemm) => {
    const newOrderItem = { ...item, orderId: orderItems.length + 1 };
    setOrderItems((prevItems) => [...prevItems, newOrderItem]);
  };

  const removeFromOrder = (itemId: number) => {
    setOrderItems((prevItems) =>
      prevItems.filter((item) => item.id! !== itemId)
    );
  };

  const emptyOrder = () => {
    setOrderItems([]);
  };

  const isItemInOrder = (itemId: number) => {
    return orderItems.some((item) => item.id === itemId);
  };

  return (
    <OrderContext.Provider
      value={{
        orderItems,
        addToOrder,
        removeFromOrder,
        emptyOrder,
        isItemInOrder,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};
