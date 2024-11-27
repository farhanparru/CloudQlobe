// utils/schemaGenerator.js

export const generateSchema = (type, data) => {
    switch (type) {
      case "WebPage":
        return {
          "@context": "https://schema.org",
          "@type": "WebPage",
          ...data,
        };
      case "ItemList":
        return {
          "@context": "https://schema.org",
          "@type": "ItemList",
          itemListElement: data.items.map((item, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: item.name,
            url: item.url,
          })),
        };
      // Add more cases as needed for different schema types
      default:
        return {};
    }
  };
  