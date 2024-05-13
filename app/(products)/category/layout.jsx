import React from "react";


export const metadata = {
  title: {
    default: "Categories",
    template: "Categories : %s"
  }
}

export default function categoryLayout({ children }) {
  return <section className="grow">{children}</section>;
}
