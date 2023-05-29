import ListingCard from './ListingCard';
import FilterBar from './FilterBar';
import NavBar from './../Home/NavBar';


function ListingPage() {
    return (
        <div>
        <NavBar></NavBar>

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
            <FilterBar>

            </FilterBar>
            
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
        <footer className="mx-auto max-w-7xl overflow-hidden px-6 pb-20  sm:pb-24 lg:px-8">
        <p className="mt-10 text-center text-xs leading-5 text-gray-500">
          &copy; 2023 BoilerStorage. All rights reserved.
        </p>
      </footer>
        </div>
    )
}

export default ListingPage;