-- CreateTable
CREATE TABLE "orders" (
    "orderID" TEXT NOT NULL,
    "isCancelled" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "orders_pkey" PRIMARY KEY ("orderID")
);

-- CreateTable
CREATE TABLE "product" (
    "productID" TEXT NOT NULL,
    "productName" VARCHAR NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "product_pkey" PRIMARY KEY ("productID")
);

-- CreateTable
CREATE TABLE "Logs" (
    "id" TEXT NOT NULL,
    "msg" TEXT,
    "actor" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Logs_pkey" PRIMARY KEY ("id")
);
