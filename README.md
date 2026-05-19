# PickN'Drop

> Rent a shelf. Sell online. Picked up or delivered.

PickN'Drop is a full-stack multi-tenant SaaS platform for managing physical shelf space in Nairobi CBD. Online businesses rent shelf slots, store their products at a managed facility, and clients browse, order, and choose between self-pickup or doorstep delivery all through one platform.

---

## What it does

- **Businesses** get a dedicated shelf slot and a portal to manage products, track stock, handle orders, and monitor sales
- **Clients** browse a unified storefront, add to cart, and check out with M-Pesa picking up from CBD or requesting delivery
- **The shelf manager (admin)** oversees all tenants, shelf occupancy, subscriptions, deliveries, and billing from a single dashboard

---

## Features

### Admin

- Visual shelf occupancy map
- Tenant onboarding, plan assignment, and suspension
- Subscription & billing management with overdue alerts
- Cross-business order and delivery management
- Revenue reporting and invoice generation
- Staff roles and shelf zone configuration

### Business portal

- Product catalogue management (add, edit, toggle visibility)
- Real-time stock levels with low-stock alerts
- Restock request workflow (notify admin of incoming drop-off)
- Order management (new → packed → ready → delivered)
- Sales history and revenue chart
- Shelf capacity monitoring

### Client storefront

- Browse products across all businesses, filterable by category and store
- Product detail modal with stock status and store info
- Cart with M-Pesa / card checkout
- Fulfillment choice: CBD self-pickup or delivery with address and time slot
- Order history and tracking

### Platform

- Multi-role auth: Admin · Business · Client
- Subscription tiers: Basic · Pro · Enterprise
- Auto-suspension of shelf visibility on lapsed subscription
- Fully responsive (mobile-first)

---

## Tech stack

| Layer          | Technology           |
| -------------- | -------------------- |
| Frontend       | React + Tailwind CSS |
| Backend & Auth | Laravel              |
| Payments       | M-Pesa Daraja API    |

---

## Roadmap

- [ ] SMS order notifications (Africa's Talking)
- [ ] Business analytics dashboard (charts, top products, peak hours)
- [ ] Courier assignment and real-time delivery tracking
- [ ] Public business storefronts (shareable `/store/:slug` pages)
- [ ] Multi-location expansion

---
