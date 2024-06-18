# @Regression
# Feature: Verify Product Detail Page Carousels
# TC_FT_037
# Carousels - verifying Add to cart
# Verifying all types of Carousels

Feature: Browse Product Test Cases

    @pdp_Carousels @CBUS @CBCA @BrowseProduct
    Scenario Outline: As a Guest user wants to add People Also Viewed Carousel item to Cart
        Given the Product Detail Page with "CarouselSKU" sku is retrieved
        When that a customer navigates to the PDP
        Then they see the product detail page
        Then they see "People Also Viewed" Carousel
        Then they click on Add To Cart button on "People Also Viewed" Carousel

    @pdp_Carousels @CB2US @CB2CA @BrowseProduct
    Scenario Outline: As a Guest user wants to add People Also Viewed Carousel item to Cart
        Given the Product Detail Page with "CarouselSKU" sku is retrieved
        When that a customer navigates to the PDP
        Then they see the product detail page
        Then they see "PEOPLE ALSO VIEWED" Carousel
        Then they click on Add To Cart button on "PEOPLE ALSO VIEWED" Carousel


    @pdp_Carousels @CBUS @CBCA @BrowseProduct
    Scenario Outline: As a Guest user wants to add Extras and Essentials Carousel item to Cart
        Given the Product Detail Page with "ExtrasSKU" sku is retrieved
        When that a customer navigates to the PDP
        Then they see the product detail page
        Then they see "Extras and Essentials" Carousel
        Then they click on Add To Cart button on "Extras and Essentials" Carousel

    @pdp_Carousels  @CB2US @CB2CA @BrowseProduct
    Scenario Outline: As a Guest user wants to add Extras and Essentials Carousel item to Cart
        Given the Product Detail Page with "ExtrasSKU" sku is retrieved
        When that a customer navigates to the PDP
        Then they see the product detail page
        Then they see "EXTRAS AND ESSENTIALS" Carousel
        Then they click on Add To Cart button on "EXTRAS AND ESSENTIALS" Carousel

    @pdp_Carousels @CBUS @CBCA @BrowseProduct
    Scenario Outline: As a Guest user wants to add Part Of Colection Carousel item to Cart
        Given the Product Detail Page with "PartOfCollectionSKU" sku is retrieved
        When that a customer navigates to the PDP
        Then they see the product detail page
        Then they see "Part of a Collection" Carousel
        Then they click on Add To Cart button on "Part of a Collection" Carousel

    @pdp_Carousels  @CB2US @CB2CA @BrowseProduct
    Scenario Outline: As a Guest user wants to add Part Of Colection Carousel item to Cart
        Given the Product Detail Page with "PartOfCollectionSKU" sku is retrieved
        When that a customer navigates to the PDP
        Then they see the product detail page
        Then they see "PART OF A COLLECTION" Carousel
        Then they click on Add To Cart button on "PART OF A COLLECTION" Carousel

    @pdp_Carousels @CBUS @CBCA @BrowseProduct
    Scenario Outline: As a Guest user wants to add Complete the Look Carousel item to Cart
        Given the Product Detail Page with "CompletthelookSKU" sku is retrieved
        When that a customer navigates to the PDP
        Then they see the product detail page
        Then they see "Complete the Look" Carousel
        Then they click on Add To Cart button on "Complete the Look" Carousel

    @pdp_Carousels @CB2US @CB2CA @BrowseProduct
    Scenario Outline: As a Guest user wants to add Complete the Look Carousel item to Cart
        Given the Product Detail Page with "CompletthelookSKU" sku is retrieved
        When that a customer navigates to the PDP
        Then they see the product detail page
        Then they see "COMPLETE THE LOOK" Carousel
        Then they click on Add To Cart button on "COMPLETE THE LOOK" Carousel


    @pdp_Carousels @CBUS @CBCA @BrowseProduct
    Scenario Outline: As a Guest user wants to add Shop Similar Carousel item to Cart
        Given the Product Detail Page with "ShopSimilarSKU" sku is retrieved
        When that a customer navigates to the PDP
        Then they see the product detail page
        Then they see "Shop Similar Items In-Stock" Carousel
        Then they click on Add To Cart button on "Shop Similar Items In-Stock" Carousel

    @pdp_Carousels  @CB2US @CB2CA @BrowseProduct
    Scenario Outline: As a Guest user wants to add Shop Similar Carousel item to Cart
        Given the Product Detail Page with "ShopSimilarSKU" sku is retrieved
        When that a customer navigates to the PDP
        Then they see the product detail page
        Then they see "SHOP SIMILAR ITEMS IN-STOCK" Carousel
        Then they click on Add To Cart button on "SHOP SIMILAR ITEMS IN-STOCK" Carousel

    @pdp_Carousels @CBUS @CBCA @BrowseProduct
    Scenario Outline: As a Guest user wants to add Recently Viewed item to Cart
        Given the Product Detail Page with "recentlyViewedSKU" sku is retrieved
        When that a customer navigates to the PDP
        Then they see the product detail page
        Then they see "Recently Viewed Products" Carousel
        Then they click on Add To Cart button on "Recently Viewed Products" Carousel

    @pdp_Carousels @CB2US @CB2CA @BrowseProduct
    Scenario Outline: As a Guest user wants to add Recently Viewed item to Cart
        Given the Product Detail Page with "recentlyViewedSKU" sku is retrieved
        When that a customer navigates to the PDP
        Then they see the product detail page
        Then they see "RECENTLY VIEWED PRODUCTS" Carousel
        Then they click on Add To Cart button on "RECENTLY VIEWED PRODUCTS" Carousel







