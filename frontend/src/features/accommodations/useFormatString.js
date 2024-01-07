
export function useFormatString(input) {
    return input.charAt(0).toUpperCase() + input.slice(1).toLowerCase().replace(/_/g, ' ');
}