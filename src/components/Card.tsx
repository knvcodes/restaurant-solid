export default function Card() {
  return (
    <div class="flex h-[300px] bg-white/60 border-b border-gray-200/60 dark:border-gray-400/40  overflow-hidden pb-12">
      <div class="flex-shrink-0 h-full w-1/3">
        <img
          src="https://plus.unsplash.com/premium_photo-1661883237884-263e8de8869b?q=80&w=1189&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Avatar"
          class="h-full w-full object-fill"
        />
      </div>

      <div class="flex-1 p-4 ml-12 flex flex-col justify-center">
        <h2 class="text-lg font-semibold">Brooklyn Chop House</h2>
        <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">
          150 Chop House Street
        </p>
        <p class="text-sm text-gray-500 dark:text-gray-400">London</p>

        <div class="mt-4">
          <button class="px-3 py-1.5 text-sm font-medium rounded-lg bg-gray-900 text-white hover:bg-gray-800 transition-colors">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}
