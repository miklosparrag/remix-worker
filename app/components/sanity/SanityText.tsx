
import type { SanityDocument } from "@sanity/client";
import {PortableText, type PortableTextComponents} from '@portabletext/react'

const components: PortableTextComponents = {
    block: {
      
      h1: ({ children }) => {
        return <h1 className="text-3xl font-bold">{children}</h1>;
      },
      h2: ({ children }) => {
        return <h2 className="text-2xl font-bold">{children}</h2>;
      },
      h3: ({ children }) => {
        return <h3 className="text-xl font-bold">{children}</h3>;
      },
      h4: ({ children }) => { 
        return <h4 className="text-lg font-bold">{children}</h4>;
      },
      h5: ({ children }) => { 
        return <h5 className="text-base font-bold">{children}</h5>;
      },
      h6: ({ children }) => {
        return <h6 className="text-sm font-bold">{children}</h6>;
      },
      normal: ({ children }) => {
        return <p className="text-base">{children}</p>;
      },
      blockquote: ({ children }) => {
        return (
          <blockquote className="border-l-4 border-gray-500 pl-4 italic">
            {children}
          </blockquote> 
        );
      },
      large: ({ children }) => {
        return <p className="text-xl">{children}</p>;
      },
      small: ({ children }) => {
        return <p className="text-sm">{children}</p>;
      },
      lead: ({ children }) => {
        return <p className="text-lg">{children}</p>;
      },    
    },
    marks: {
      link: ({ children, value }) => {
        const { href } = value;
        return (
          <a href={href} className="text-blue-500 underline">
            {children}
          </a>
        );
      },
      strong: ({ children }) => {
        return <strong className="font-bold">{children}</strong>;
      },
      em: ({ children }) => {
        return <em className="italic">{children}</em>;
      },
      code: ({ children }) => {
        return <code className="bg-gray-200 p-1 rounded">{children}</code>;
      },
      underline: ({ children }) => {
        return <span className="underline">{children}</span>;
      },
      strike: ({ children }) => {
        return <span className="line-through">{children}</span>;
      },
      highlight: ({ children }) => {
        return <span className="bg-yellow-200">{children}</span>;
      } ,
      color: ({ children, value }) => {
        const { color } = value;
        return <span className={`text-${color}`}>{children}</span>;
      } 
    },
    list: {
      bullet: ({ children }) => {
        return <ul className="list-disc pl-5">{children}</ul>;
      },
      number: ({ children }) => {
  
        return <ol className="list-decimal pl-5">{children}</ol>;
      }
      
    },
    listItem: {
      bullet: ({ children }) => {
        return <li className="text-lg">{children}</li>;
      },
      number: ({ children }) => {
        return <li className="text-lg">{children}</li>;
      }
    },
    types: {
      image: ({ value }) => {   
        const { asset } = value;
        return (
          <img
            src={asset.url}
            alt={asset.alt || ""}
            className="w-full h-auto"
          />
        );
      } 
  }
}

export default function SanityText({value}:{value:SanityDocument}) {
    return <PortableText value={value} components={components} />
}