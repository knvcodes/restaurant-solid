import { Breadcrumbs } from "@kobalte/core/breadcrumbs";
import { For, Show } from "solid-js";
import { CustomBreadCrumbsProps, Path } from "../../types";

const CustomBreadCrumbs = (props: CustomBreadCrumbsProps) => {
  return (
    <Show when={props.paths.length > 0}>
      <Breadcrumbs>
        <ol class="breadcrumbs__list m-4">
          <For each={props.paths}>
            {(pathItem: Path, index) => (
              <li class="breadcrumbs__item">
                <Breadcrumbs.Link
                  href={pathItem.path}
                  class="breadcrumbs__link"
                >
                  {pathItem.pathName}
                </Breadcrumbs.Link>
                <Show when={index() !== props.paths.length - 1}>
                  <Breadcrumbs.Separator class="breadcrumbs__separator" />
                </Show>
              </li>
            )}
          </For>
        </ol>
      </Breadcrumbs>
    </Show>
  );
};

export default CustomBreadCrumbs;
