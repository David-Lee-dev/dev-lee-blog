export default function fontColorConverter(color: string) {
  switch (color) {
    case 'gray':
      return 'text-gray-400 ';
    case 'brown':
      return 'text-amber-900 ';
    case 'orange':
      return 'text-orange-500 ';
    case 'yellow':
      return 'text-amber-500 ';
    case 'green':
      return 'text-green-600 ';
    case 'blue':
      return 'text-blue-600 ';
    case 'purple':
      return 'text-purple-600 ';
    case 'pink':
      return 'text-pink-500 ';
    case 'red':
      return 'text-red-600 ';
    case 'gray_background':
      return 'bg-gray-400/[.3] ';
    case 'brown_background':
      return 'bg-amber-900/[.3] ';
    case 'orange_background':
      return 'bg-orange-500/[.3] ';
    case 'yellow_background':
      return 'bg-amber-500/[.3] ';
    case 'green_background':
      return 'bg-green-600/[.3] ';
    case 'blue_background':
      return 'bg-blue-600/[.3] ';
    case 'purple_background':
      return 'bg-purple-600/[.3] ';
    case 'pink_background':
      return 'bg-pink-500/[.3] ';
    case 'red_background':
      return 'bg-red-600/[.3] ';
    default:
      return '';
  }
}
