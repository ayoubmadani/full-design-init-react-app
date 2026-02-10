import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
  Index,
} from 'typeorm';

// Import related entities (adjust paths as needed)
// import { User } from './User';
// import { Product } from './Product';
// import { Order } from './Order';
// import { Category } from './Category';

export enum StoreStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  SUSPENDED = 'suspended',
  PENDING = 'pending',
}

export enum StoreNiche {
  FASHION = 'fashion',
  ELECTRONICS = 'electronics',
  HOME = 'home',
  BEAUTY = 'beauty',
  SPORTS = 'sports',
  BOOKS = 'books',
  FOOD = 'food',
  OTHER = 'other',
}

export enum StoreLocation {
  ALGIERS = 'Algiers',
  ORAN = 'Oran',
  CONSTANTINE = 'Constantine',
  SETIF = 'Setif',
  ANNABA = 'Annaba',
  BLIDA = 'Blida',
  BATNA = 'Batna',
  TLEMCEN = 'Tlemcen',
  INTERNATIONAL = 'International',
}

@Entity('stores')
@Index(['domain'], { unique: true })
@Index(['slug'], { unique: true })
@Index(['status'])
@Index(['owner_id'])
export class Store {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // Basic Information
  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  domain: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  slug: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'enum', enum: StoreStatus, default: StoreStatus.PENDING })
  status: StoreStatus;

  // Owner/User Relationship
  @Column({ type: 'uuid', name: 'owner_id' })
  ownerId: string;

  // @ManyToOne(() => User, (user) => user.stores, { onDelete: 'CASCADE' })
  // @JoinColumn({ name: 'owner_id' })
  // owner: User;

  // Location & Contact
  @Column({ type: 'enum', enum: StoreLocation, default: StoreLocation.ALGIERS })
  location: StoreLocation;

  @Column({ type: 'varchar', length: 20, nullable: true })
  phone: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  email: string;

  @Column({ type: 'text', nullable: true })
  address: string;

  // Branding & Design
  @Column({ type: 'varchar', length: 500, nullable: true })
  logo_url: string;

  @Column({ type: 'varchar', length: 7, default: '#6366f1' })
  primary_color: string;

  @Column({ type: 'varchar', length: 7, nullable: true })
  secondary_color: string;

  @Column({ type: 'enum', enum: StoreNiche, default: StoreNiche.FASHION })
  niche: StoreNiche;

  // Hero Section
  @Column({ type: 'varchar', length: 500, nullable: true })
  hero_image_url: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  hero_title: string;

  @Column({ type: 'text', nullable: true })
  hero_subtitle: string;

  // TopBar Settings
  @Column({ type: 'boolean', default: true })
  show_top_bar: boolean;

  @Column({ type: 'varchar', length: 500, nullable: true })
  top_bar_text: string;

  @Column({ type: 'varchar', length: 7, nullable: true })
  top_bar_color: string;

  // SEO & Meta
  @Column({ type: 'varchar', length: 255, nullable: true })
  meta_title: string;

  @Column({ type: 'text', nullable: true })
  meta_description: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  meta_image_url: string;

  @Column({ type: 'simple-array', nullable: true })
  meta_keywords: string[];

  // Social Media
  @Column({ type: 'varchar', length: 255, nullable: true })
  facebook_url: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  instagram_url: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  twitter_url: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  tiktok_url: string;

  // Business Settings
  @Column({ type: 'varchar', length: 3, default: 'DZD' })
  currency: string;

  @Column({ type: 'varchar', length: 10, default: 'ar' })
  language: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  timezone: string;

  // Shipping & Payment
  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  shipping_fee: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  free_shipping_threshold: number;

  @Column({ type: 'boolean', default: true })
  cash_on_delivery: boolean;

  @Column({ type: 'boolean', default: false })
  online_payment: boolean;

  // Performance Metrics (can be calculated or cached)
  @Column({ type: 'int', default: 0 })
  total_products: number;

  @Column({ type: 'int', default: 0 })
  total_orders: number;

  @Column({ type: 'int', default: 0 })
  total_customers: number;

  @Column({ type: 'decimal', precision: 15, scale: 2, default: 0 })
  total_revenue: number;

  @Column({ type: 'int', default: 0 })
  total_views: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, default: 0 })
  average_rating: number;

  @Column({ type: 'int', default: 0 })
  total_reviews: number;

  // Features & Settings
  @Column({ type: 'boolean', default: true })
  is_published: boolean;

  @Column({ type: 'boolean', default: true })
  allow_reviews: boolean;

  @Column({ type: 'boolean', default: true })
  show_stock: boolean;

  @Column({ type: 'boolean', default: false })
  require_email: boolean;

  @Column({ type: 'json', nullable: true })
  custom_settings: Record<string, any>;

  // Analytics
  @Column({ type: 'varchar', length: 255, nullable: true })
  google_analytics_id: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  facebook_pixel_id: string;

  // Subscription/Plan
  @Column({ type: 'varchar', length: 50, default: 'free' })
  plan_type: string;

  @Column({ type: 'timestamp', nullable: true })
  plan_expires_at: Date;

  // Verification
  @Column({ type: 'boolean', default: false })
  is_verified: boolean;

  @Column({ type: 'timestamp', nullable: true })
  verified_at: Date;

  // Timestamps
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  deletedAt: Date;

  // Relationships
  // @OneToMany(() => Product, (product) => product.store)
  // products: Product[];

  // @OneToMany(() => Order, (order) => order.store)
  // orders: Order[];

  // @OneToMany(() => Category, (category) => category.store)
  // categories: Category[];

  // Virtual/Computed Properties
  get fullDomain(): string {
    return `${this.domain}.mdstore.dz`;
  }

  get isActive(): boolean {
    return this.status === StoreStatus.ACTIVE;
  }

  get isPremium(): boolean {
    return this.plan_type !== 'free' && 
           this.plan_expires_at && 
           new Date() < this.plan_expires_at;
  }

  // Methods
  activate(): void {
    this.status = StoreStatus.ACTIVE;
    this.is_published = true;
  }

  deactivate(): void {
    this.status = StoreStatus.INACTIVE;
    this.is_published = false;
  }

  suspend(): void {
    this.status = StoreStatus.SUSPENDED;
    this.is_published = false;
  }

  verify(): void {
    this.is_verified = true;
    this.verified_at = new Date();
  }

  incrementViews(): void {
    this.total_views += 1;
  }

  updateRevenue(amount: number): void {
    this.total_revenue = Number(this.total_revenue) + amount;
  }

  updateRating(newRating: number): void {
    const totalRatings = this.total_reviews * this.average_rating;
    this.total_reviews += 1;
    this.average_rating = (totalRatings + newRating) / this.total_reviews;
  }
}