import ListingCard from './ListingCard';


function ListingPage() {
    return (
        <div
        className="
            max-w-[2520px]
            mx-auto
            xl:px-20 
            md:px-10
            sm:px-2
            px-4
            "
        >
            <div 
            className="
                pt-24
                grid 
                grid-cols-1 
                sm:grid-cols-2 
                md:grid-cols-3 
                lg:grid-cols-4
                xl:grid-cols-5
                2xl:grid-cols-6
                gap-8
            "
            >
                <ListingCard  />
                <ListingCard  />
                <ListingCard  />
                <ListingCard  />
                <ListingCard  />
                <ListingCard  />
                <ListingCard  />
                <ListingCard  />
                <ListingCard  />
                <ListingCard  />
                <ListingCard  />
                <ListingCard  />
            </div>
        </div>
    )
}

export default ListingPage;