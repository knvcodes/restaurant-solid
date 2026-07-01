import { Breadcrumbs } from "@kobalte/core/breadcrumbs";
import { For, Show } from "solid-js";
import { CustomBreadCrumbsProps, Path } from "../types";

const CustomBreadCrumbs = (props: CustomBreadCrumbsProps) => {
  const { paths } = props;

  return (
    <Show when={paths.length > 0}>
      <Breadcrumbs>
        <ol class="breadcrumbs__list">
          <For each={paths}>
            {(pathItem: Path) => (
              <li class="breadcrumbs__item">
                <Breadcrumbs.Link
                  href={pathItem.path}
                  class="breadcrumbs__link"
                >
                  {pathItem.pathName}
                </Breadcrumbs.Link>
                <Breadcrumbs.Separator class="breadcrumbs__separator" />
              </li>
            )}
          </For>
        </ol>
      </Breadcrumbs>
    </Show>
  );
};

export default CustomBreadCrumbs;
