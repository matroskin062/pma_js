const findHEXColors = () => {
  const regex = /#([0-9A-F]{6}|[0-9A-F]{3})/gi;
  const doc = document.documentElement.innerHTML;
  return doc.match(regex);
};

const findPhoneNumbers = () => {
  const regex = /(\+\s?\(380\)[-\s]?0(66|67|68|96|97|98|50|95|99|63|73|93))[-\s]?\d{3}[-\s]?\d{2}[-\s]?\d{2}/gi;
  const doc = document.body.innerHTML;
  return doc.match(regex);
};

const replaceHeadings = () => {
  document.documentElement.innerHTML = document.documentElement.outerHTML.replace(
    /h1/g,
    'h2'
  );
};

const findScriptTags = () => {
  return document.documentElement.innerHTML.match(
    /<script[\s\S]*?>[\s\S]*?<\/script>/gi
  );
};

console.log(findHEXColors());
console.log(findPhoneNumbers());
replaceHeadings();
console.log(findScriptTags());
