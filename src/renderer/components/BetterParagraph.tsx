import { JSX, Fragment, ReactNode } from "react";

// this component receives ReactNode as Markdown syntax and convert it to JSX element

export default function BetterParagraph({ children }: { children: ReactNode }) {
  if (typeof children !== "string") {
    return children;
  }

  const parseItalicText = (text: string): JSX.Element[] => {
    const elements: JSX.Element[] = [];
    const italicRegex = /\*(.*?)\*/g;
    let lastIndex = 0;
    let match = italicRegex.exec(text);

    while (match !== null) {
      if (match.index > lastIndex) {
        elements.push(
          <Fragment key={Math.random()}>
            {text.substring(lastIndex, match.index)}
          </Fragment>,
        );
      }

      elements.push(<i key={Math.random()}>{match[1]}</i>);

      lastIndex = match.index + match[0].length;
      match = italicRegex.exec(text);
    }

    if (lastIndex < text.length) {
      elements.push(
        <Fragment key={Math.random()}>{text.substring(lastIndex)}</Fragment>,
      );
    }

    return elements;
  };

  const parseMarkdown = (text: string): JSX.Element[] => {
    const elements: JSX.Element[] = [];
    const boldRegex = /\*\*(.*?)\*\*/g;

    const remainingText = text;
    let lastIndex = 0;

    let match = boldRegex.exec(remainingText);
    while (match !== null) {
      if (match.index > lastIndex) {
        elements.push(
          <Fragment key={Math.random()}>
            {parseItalicText(remainingText.substring(lastIndex, match.index))}
          </Fragment>,
        );
      }

      elements.push(<b key={Math.random()}>{parseItalicText(match[1])}</b>);

      lastIndex = match.index + match[0].length;
      match = boldRegex.exec(remainingText);
    }

    if (lastIndex < remainingText.length) {
      elements.push(
        <Fragment key={Math.random()}>
          {parseItalicText(remainingText.substring(lastIndex))}
        </Fragment>,
      );
    }

    return elements;
  };

  return <>{parseMarkdown(children)}</>;
}
