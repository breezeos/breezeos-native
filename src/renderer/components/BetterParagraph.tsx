import * as React from "react";

// this component receives ReactNode as Markdown syntax and convert it to React.JSX element

export default function BetterParagraph({
  children,
}: {
  children: React.ReactNode;
}) {
  if (typeof children !== "string") {
    return children;
  }

  const parseItalicText = (text: string): React.JSX.Element[] => {
    const elements: React.JSX.Element[] = [];
    const italicRegex = /\*(.*?)\*/g;
    let lastIndex = 0;
    let match = italicRegex.exec(text);

    while (match !== null) {
      if (match.index > lastIndex) {
        elements.push(
          <React.Fragment key={Math.random()}>
            {text.substring(lastIndex, match.index)}
          </React.Fragment>,
        );
      }

      elements.push(<i key={Math.random()}>{match[1]}</i>);

      lastIndex = match.index + match[0].length;
      match = italicRegex.exec(text);
    }

    if (lastIndex < text.length) {
      elements.push(
        <React.Fragment key={Math.random()}>
          {text.substring(lastIndex)}
        </React.Fragment>,
      );
    }

    return elements;
  };

  const parseMarkdown = (text: string): React.JSX.Element[] => {
    const elements: React.JSX.Element[] = [];
    const boldRegex = /\*\*(.*?)\*\*/g;

    const remainingText = text;
    let lastIndex = 0;

    let match = boldRegex.exec(remainingText);
    while (match !== null) {
      if (match.index > lastIndex) {
        elements.push(
          <React.Fragment key={Math.random()}>
            {parseItalicText(remainingText.substring(lastIndex, match.index))}
          </React.Fragment>,
        );
      }

      elements.push(
        <strong className="font-semibold" key={Math.random()}>
          {parseItalicText(match[1])}
        </strong>,
      );

      lastIndex = match.index + match[0].length;
      match = boldRegex.exec(remainingText);
    }

    if (lastIndex < remainingText.length) {
      elements.push(
        <React.Fragment key={Math.random()}>
          {parseItalicText(remainingText.substring(lastIndex))}
        </React.Fragment>,
      );
    }

    return elements;
  };

  return <>{parseMarkdown(children)}</>;
}
