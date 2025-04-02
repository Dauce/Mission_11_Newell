import { useState } from 'react';
import CategoryFilter from '../components/CategoryFilter';
import BookList from '../components/BookList';
import WelcomeBand from '../components/WelcomeBand';
import CartSummary from '../components/CartSummary';

function ProjectsPage() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [sortByTitle, setSortByTitle] = useState<boolean>(false);

  return (
    <>
      <div className="container mt-4">
        <CartSummary />
        <WelcomeBand />
        <div className="row">
          <div className="col-md-3">
            <CategoryFilter
              selectedCategories={selectedCategories}
              setSelectedCategories={setSelectedCategories}
            />
          </div>
          <div className="col-md-9">
            {/* Sort Button */}
            <button
              className="btn btn-outline-primary mb-3"
              onClick={() => setSortByTitle((prev) => !prev)}
            >
              {sortByTitle ? 'Clear Sort' : 'Sort Alphabetically by Title'}
            </button>
            {/* Pass sort prop down to BookList */}
            <BookList
              selectedCategories={selectedCategories}
              sortByTitle={sortByTitle}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default ProjectsPage;
