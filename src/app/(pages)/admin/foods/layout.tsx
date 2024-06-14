import React from 'react';

type props = {
  categories: React.ReactNode;
  foods: React.ReactNode;
}

const Layout: React.FC<props> = ({ categories, foods }) => {
  return (
    <div className="p-4">
      {categories}
      {foods}
    </div>
  );
}

export default Layout;